export class CommUtils {

    public static parseFinancial(numT: string) {
        numT = numT.replace(",", "");
        return parseFloat(numT);
    }

}