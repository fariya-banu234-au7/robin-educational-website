const count = reports => {
    // creating array ele 0 and length 7
    let count = [... Array(7)].map(i => 0);

    for(let i = 0; i < reports.length; i++){
        count[reports[i]] += 1;
    };

    return count;
};


export const detailReport = reports => {
    let countArr = count(reports);
    return {
        'It_is_copied': countArr[1],
        'It_is_unappropriate': countArr[2],
        'Threats_of_violence_and_incitement': countArr[3],
        'Hate-Speech': countArr[4],
        'Harassment': countArr[5],
        'Ads_Promotion_and_Marketing': countArr[6]
    };
};