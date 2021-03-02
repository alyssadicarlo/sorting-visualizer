export default function BubbleSort(array) {
    let inputArr = [...array];
    let len = inputArr.length;
    let steps = [];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (inputArr[j] > inputArr[j + 1]) {
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
            }
            steps.push([...inputArr]);
        }
    }
    return steps;
}