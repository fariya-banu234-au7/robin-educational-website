export const order = (prop, key = 1) => {
    return (a, b) => {
        if(a[prop] > b[prop]) {
            return 1*key
        } else if (a[prop] < b[prop]){
            return -1*key
        }
        return 0
    }
};