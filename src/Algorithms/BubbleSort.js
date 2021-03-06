const BubbleSort = (inputArr, arraySteps, colorSteps) => {
    let array = [...inputArr];
    let len = array.length;
    let colors = new Array(len).fill("#A5E5D9");
    for (let i =0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j+1]) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp
            }
            colors[j] = "gray";
            colors[j+1] = "gray";
            arraySteps.push([...array]);
            colorSteps.push([...colors]);
            colors[j] = "#A5E5D9";
            colors[j+1] = "#A5E5D9";
        }
        colors[len - i - 1] = "green";
        colorSteps[-1] = colors;
    }
    colorSteps[colorSteps.length - 1] = new Array(len).fill("green");
};

export default BubbleSort;