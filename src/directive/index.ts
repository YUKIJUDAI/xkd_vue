const longtap = {
    bind: function(el: any, binding: any, vNode: any) {
        // 确保提供的表达式是函数
        if (typeof binding.value !== "function") {
            // 获取组件名称
            const compName = vNode.context.name; 

            let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `;

            if (compName) {
                warn += `Found in component '${compName}' `;
            }

            console.warn(warn);
        } // 定义变量
        let pressTimer: any = null;
        let start = (e: any) => {
            if (e.type === "click" && e.button !== 0) {
                return;
            }

            if (pressTimer === null) {
                pressTimer = setTimeout(() => {
                    handler(e);
                }, 1000);
            }
        }; // 取消计时器

        let cancel = (e: any) => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        }; // 运行函数

        const handler = (e: any) => {
            binding.value(e);
        };

        el.addEventListener("mousedown", start);

        el.addEventListener("touchstart", start);

        el.addEventListener("mouseout", cancel);

        el.addEventListener("touchend", cancel);

        el.addEventListener("touchcancel", cancel);
    },
};

export default { longtap };
