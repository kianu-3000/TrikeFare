
const checkEmptyForms = (formData) => {
    // console.log("HERE: " + JSON.stringify(formData))
    const hasEmptyFields = Object.values(formData).some(
        (value) => typeof value === 'string' && value.trim() === ''
    );

    return hasEmptyFields;
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const distancePrice = (tempDist, baseFare, fareRate) => {
    let tempPrice;
    if (parseFloat(tempDist) > 3) {
        tempPrice = baseFare + ((parseFloat(tempDist).toFixed(2) - 2) * parseFloat(fareRate).toFixed(2));
        return tempPrice.toFixed(2);
    }else{
        return baseFare;
    }
    
}

export { checkEmptyForms, formatDate, distancePrice };