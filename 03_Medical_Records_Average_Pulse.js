async function calcAveragePulse(docId, diagnosisName) {
    const startTime = new Date();
    base_url = "https://jsonmock.hackerrank.com/api/medical_records"
    const promiseOfResult = fetch(base_url).then(res => {return res.json()}) 
    const response = await promiseOfResult
    const total_pages = response.total_pages
    let tcnt=0
    let pulse=0
    for (let page=1; page<=total_pages; page++) {
        const promiseOfInfo = fetch(base_url+`?page=${page}`).then(res => {return res.json()})
        const responseX = await promiseOfInfo
        const data = responseX.data
        for (const info of data) {
            if (info.doctor.id == docId && info.diagnosis.name== diagnosisName) {
                pulse += info.vitals.pulse
                tcnt += 1
            }
        }
    }
    const avgPulse = pulse / tcnt;
    const endTime = new Date()
    console.log("Elapsed Time: ", endTime-startTime, "ms");
    return avgPulse;
}


calcAveragePulse(2, "Pulmonary embolism").then(ans=>{
    console.log(ans)
})