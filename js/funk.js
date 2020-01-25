window.addEventListener("load", function(){
    let deg = 0;
    let exploded = false;
    const h = window.screen.height;
    const parallel = document.querySelector(".parallel svg");
    const parallelContainer = document.querySelector(".parallel");
    parallelContainer.style.height = this.getComputedStyle(parallel).height
    this.console.log(this.getComputedStyle(parallel).height);
    for(let i = 0; i<7;i++){
        parallel.style.zIndex = 7;
        const p = parallel.cloneNode(true);
        p.style.zIndex = 6 - i;
        parallelContainer.append(p);
    }
    parallels = document.querySelectorAll(".parallel svg");
    document.addEventListener("wheel", e => {
        const d = e.deltaY;
        const direction = e.deltaY > 0 ? "down" : "up";
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
    })
});