
function rupiahFormat(num) {
    return new Intl.NumberFormat(['ban', 'id']).format(num);
}

export default rupiahFormat;