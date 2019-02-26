var width = $(".step-management .body").width()-30;
var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: width,
    gridSize: 1,
    model: graph
});
//定义模块形状
var stat = function(x, y, shape, background, text) {
    var cell;
    if(shape === "rect") {
        cell = new joint.shapes.basic.Rect({
            position: {
                x: x,
                y: y
            }, //坐标
            size: {
                width: 140,
                height: 40
            }, //宽高
            attrs: {
                rect: {
                    fill: {
                        type: 'linearGradient',
                        stops: [{
                            offset: '0%',
                            color: background
                        }, //渐变开始
                            {
                                offset: '100%',
                                color: background
                            }
                        ], //渐变结束
                        attrs: {
                            x1: '0%',
                            y1: '0%',
                            x2: '0%',
                            y2: '100%'
                        }
                    },
                    stroke: background, //边框颜色
                    'stroke-width': 1 //边框大小
                },
                text: {
                    text: text,
                    'ref-x': .5,
                    'ref-y': .5,
                    fill: '#337ab7'
                }, //显示文字
            }
        });
    } else if(shape === "ellipse") {
        cell = new joint.shapes.basic.Ellipse({
            position: {
                x: x,
                y: y
            }, //坐标
            size: {
                width: 140,
                height: 40
            }, //宽高
            attrs: {
                ellipse: {
                    fill: {
                        type: 'linearGradient',
                        stops: [{
                            offset: '0%',
                            color: background
                        }, //渐变开始
                            {
                                offset: '100%',
                                color: '#FFFFFF'
                            } //渐变结束
                        ],
                        attrs: {
                            x1: '0%',
                            y1: '0%',
                            x2: '0%',
                            y2: '100%'
                        }
                    },
                    stroke: background, //边框颜色
                    'stroke-width': 1 //边框大小
                },
                text: {
                    text: text,
                    'ref-x': .5,
                    'ref-y': .5,
                    fill: '#337ab7'
                }, //显示文字
            }
        });
    }
    graph.addCell(cell);
    return cell;
};

//定义连线
function link(source, target, label) {
    var cell = new joint.dia.Link({
        source: {
            id: source.id
        },
        target: {
            id: target.id
        },
        labels: [{
            position: 0.5,
            attrs: {
                text: {
                    text: label || '',
                    'font-weight': 'bold'
                }
            }
        }],

        attrs: {
            '.connection': {
                stroke: '#333333', //连线颜色
                'stroke-width': 4 //连线粗细
            },
            '.marker-target': {
                fill: '#000', //箭头颜色
                d: 'M 10 0 L 0 5 L 10 10 z' //箭头样式
            }
        }
    });
    graph.addCell(cell);
    return cell;
};
var data = [
    [{
        title: '订单',
        tolink: "",
        state: "1",
        id: "1",
        name: '订单'
    }],
    [{
        title: '预售',
        tolink: "1",
        state: "1",
        id: "2",
        name: '预售'
    }, {
        title: '预售2',
        tolink: "1",
        state: "0",
        id: "3",
        name: '预售2'
    }],
    [{
        title: '采购清单',
        tolink: "2",
        state: "-1",
        id: "4",
        name: '采购清单'
    }, {
        title: '待加工',
        tolink: "2",
        state: "-1",
        id: "5",
        name: '待加工'
    }]
]

console.log(data)
var arraylist = [];
$.each(data, function(index, item1) {

});