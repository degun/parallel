window.addEventListener("load", function(){
    let deg = 0;
    let exploded = false;
    const h = window.screen.height;
    const parallel = document.querySelector(".parallel svg");
    const parallelContainer = document.querySelector(".parallel");
    parallelContainer.style.height = this.getComputedStyle(parallel).height;

    for(let i = 0; i<7;i++){
        parallel.style.zIndex = 7;
        const p = parallel.cloneNode(true);
        p.style.zIndex = 6 - i;
        parallelContainer.append(p);
    }
    parallels = document.querySelectorAll(".parallel svg");

    function parallelMove(direction, d){
        if(Math.abs(d) < 5){d < 0 ? d -= 50 : d+=50}
        deg = deg + (d/10);
        
        if(deg < 0){deg =0}
        if(deg > 100){deg = 100}

        if(deg === 0){
            parallels.forEach((p, i) => {
                i ? p.style.opacity = 0 : null;
            })
        }else{
            parallels.forEach((p, i) => {
                i ? p.style.opacity = 1 : null;
            })
        }

        if(direction === "down"){
            if(deg <=60){
                parallels.forEach(p => {
                    p.style.transform = `rotate3d(1,0,0,${deg}deg)`;
                    p.classList.remove("outlined")
                })
            }else{
                parallels.forEach(p => {
                    p.classList.add("outlined")
                })
                if(!exploded){
                    parallels.forEach((p, i) => {
                        p.style.top = `${(i - 3) * (h/23) }px`;
                    })
                    exploded = true;
                }
            }
        }
        if(direction === "up"){
            if(deg<60){
                parallels.forEach(p => {
                    p.style.transform = `rotate3d(1,0,0,${deg}deg)`;
                });
                if(exploded){
                    parallels.forEach(p => {
                        p.style.top = `0px`;
                        p.classList.add("outlined")
                    });
                    exploded = false;
                }
            }
            if(deg === 0){
                parallels.forEach(p => {
                    p.classList.remove("outlined")
                })
            }
        }
    }

    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                        
    var yDown = null;

    function getTouches(evt) {
    return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }                                                     

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };   


    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        const d = yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */ 
            } else {
                /* right swipe */
            }                       
        } else {
            if ( yDiff > 0 ) {
                direction = "up"
            } else { 
                direction = "down"
            }                                                                 
        }
        parallelMove(direction, d)
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    
    document.addEventListener("wheel", e => {
        const d = e.deltaY;
        const direction = d > 0 ? "down" : "up";
        parallelMove(direction, d)
    })
});