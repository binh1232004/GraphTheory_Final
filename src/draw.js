class Draw{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._draw = {};
    }
    resetDraw(){
        this._draw = {};
    }
    greeting(){
        console.log("Hello 2");
    }
}
export default Draw;    
