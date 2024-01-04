async function getWinnerTotalGoals(comp_name, year) {
    const startTime = new Date();

    const comp_url = `https://jsonmock.hackerrank.com/api/football_competitions?name=${comp_name}&year=${year}`
    const promiseOfWinner = fetch(comp_url).then(res => {return res.json()})
    const winnerRes = await promiseOfWinner
    const winning_team = winnerRes.data[0].winner

    let totalGoalScoredbyWinningTeam = 0 
    const qHome = `https://jsonmock.hackerrank.com/api/football_matches?competition=${comp_name}&year=${year}&team1=${winning_team}`
    const promiseOfHomeData = fetch(qHome).then(res=>{return res.json()})
    const iniHomeData = await promiseOfHomeData
    const total_pages_home = iniHomeData.total_pages || 1
    
    for (let page=1; page<=total_pages_home; page++) {
        const promiseOfTotalHomeGoals =  fetch(qHome+`&page=${page}`).then(res=> {return res.json()})
        const homeResult = await promiseOfTotalHomeGoals
        const dataX = homeResult.data
        for (const info of dataX) {
            console.log(info.team1, info.team1goals)
            totalGoalScoredbyWinningTeam += parseInt(info.team1goals)
        }
    }
    
    const qAway = `https://jsonmock.hackerrank.com/api/football_matches?competition=${comp_name}&year=${year}&team2=${winning_team}`
    const promiseOfAwayData = fetch(qAway).then(res=>{return res.json()})
    const iniAwayData = await promiseOfAwayData
    const total_pages_Away = iniAwayData.total_pages 
    
    for (let page=1; page<=total_pages_Away; page++) {
        const promiseOfTotalAwayGoals =  fetch(qAway+`&page=${page}`).then(res=> {return res.json()})
        const awayResult = await promiseOfTotalAwayGoals
        const dataY = awayResult.data
        for (const info of dataY) {
            console.log(info.team2, info.team2goals)
            totalGoalScoredbyWinningTeam += parseInt(info.team2goals)
        }
    }
    const endTime = new Date()
    console.log("Elapsed Time: ", endTime-startTime, "ms");
    return totalGoalScoredbyWinningTeam;
 }
 
getWinnerTotalGoals("UEFA Champions League", 2011).then(ans =>{
    console.log(ans);
})