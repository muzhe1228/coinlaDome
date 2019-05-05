import NumberColumn from "./NumberColumn";
import SymbolColumn from "./SymbolColumn";

// 滚动数字封装

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrollNumber extends cc.Component {

    @property(cc.String)
    private num: string = "0";

    // 正数时是否显示正号
    @property(Boolean)
    private showPlusSign = false;

    private numberColumns: NumberColumn[] = [];
    private negativeAndCommaLabels: SymbolColumn[] = [];

    onLoad () {
        this.initChildList();
    }

    public setNumber (num: number | string) {
        let numberValues: number[] = []; //每位的数字,从个位开始
        let commaCount: number; // 逗号的个数
        let isNegative: boolean = false;

        if (typeof num == 'number') {
            num = Math.floor(num);
            if (num < 0) {
                isNegative = true;
                num = -num;
            } else if (num === 0) {
                numberValues.push(num)
            }
            // 计算每位的数据和分隔符数量
            while(num > 0) {
                numberValues.push(num % 10);
                num = Math.floor(num / 10);
            }
        }
        else {
            for (let n of num) {
                // 正则数字
                if (n.search(/\d/) != -1) {
                    numberValues.push(parseInt(n));
                }
                // 正则负号
                else if (n.search('-') === 0){
                    isNegative = true;
                }
            }
            numberValues = numberValues.reverse();
        }
        commaCount = Math.floor((numberValues.length - 1) / 3);
        this.renderNumber(numberValues, commaCount, isNegative);
    }

    public setColor(color: cc.Color) {
        for (let number of this.numberColumns) {
            number.setColor(color);
        }
        for (let symbol of this.negativeAndCommaLabels) {
            symbol.node.color = color;
        }
    }

    // 初始化子节点列表
    private initChildList() {
        if (this.numberColumns.length === 0) {
            this.numberColumns = this.node.getComponentsInChildren(NumberColumn).reverse();
        }
        if (this.negativeAndCommaLabels.length === 0) {
            this.negativeAndCommaLabels = this.node.getComponentsInChildren(SymbolColumn).reverse();
        }
    }

    // 渲染数字，逗号，正负号
    private renderNumber(numberValues: number[], commaCount: number, isNegative: boolean) {
        this.initChildList();

        // step1. 渲染数字，从个位开始
        let columns = this.numberColumns.length;
        let values = numberValues.length;
        if (values > columns) {
            // 超出支持的最大值后 只显示最大值部分
            values = columns;
        }

        // 渲染有值部分
        let i = 0;
        for (; i < values; i++) {
            this.numberColumns[i].node.active = true;
            this.numberColumns[i].setNumber(numberValues[i]);
        }

        // 没有值部分隐藏
        for (; i < columns; i++) {
            this.numberColumns[i].node.active = false;
        }

        // step2. 渲染逗号 以及 正负号
        let commaLabelCount = this.negativeAndCommaLabels.length - 1;
        if (commaCount > commaLabelCount) {
            // 超出支持的最大值后 只显示最大值部分
            commaCount = commaLabelCount;
        }

        // 显示逗号
        let j = 0;
        for (; j < commaCount; j++) {
            this.negativeAndCommaLabels[j].node.active = true;
        }

        // 隐藏逗号
        for (; j < commaLabelCount; j++) {
            this.negativeAndCommaLabels[j].node.active = false;
        }

        // 正负号, 最后一个值
        if (this.showPlusSign) {
            this.negativeAndCommaLabels[commaLabelCount].node.active = true;
            if (isNegative) {
                this.negativeAndCommaLabels[commaLabelCount].getComponent(cc.Label).string = "-";
            } else {
                this.negativeAndCommaLabels[commaLabelCount].getComponent(cc.Label).string = "+";
            }

        } else {
            this.negativeAndCommaLabels[commaLabelCount].node.active = isNegative;
            if (!isNegative) {
                this.negativeAndCommaLabels[commaLabelCount].getComponent(cc.Label).string = "-";
            }
        }
    }
}
