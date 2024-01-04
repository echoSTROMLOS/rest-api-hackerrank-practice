async function getNumDraws(year) {
    const startTime = new Date();
    let DrawnMatchesByGoals = []

    let cnt = 0
    for (let goal = 0; goal <= 10; goal++) {
        url = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1goals=${goal}&team2goals=${goal}`
        const promiseOfResult = fetch(url).then(res => 
                                     res.json()).then(data => {
                                             return data.total })
        // const t = await promiseOfResult  //<--if we try to resolve each promise like this before going to the next iteration it would increase overall time
        // cnt += t
        DrawnMatchesByGoals.push(promiseOfResult) // putting all promises to an Array for later to resolve, may reduce overall time
    }

    const drawn_matches = await Promise.all(DrawnMatchesByGoals) //<--- this approach allows us to resolve all promises faster
    drawn_matches.forEach(t => {
          cnt += t
    })

    const endTime = new Date()
    console.log("Elapsed Time: ", endTime-startTime, "ms");
    return cnt;
}

getNumDraws(2011).then(ans => {
    console.log(ans);
})