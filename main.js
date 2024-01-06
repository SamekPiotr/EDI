let dataDisplayed = false;

function displayData() {
    if (!dataDisplayed) {
        fetch("https://my.api.mockaroo.com/players.json?key=ebb74530")
            .then(response => response.json())
            .then(data => {
                let container = document.getElementById("container");
                let table = document.createElement("table");

                let cols = Object.keys(data[0]);

                let thead = document.createElement("thead");
                let tr = document.createElement("tr");

                cols.forEach((item) => {
                    let th = document.createElement('th')
                    th.innerText = item
                    tr.appendChild(th);
                });

                thead.appendChild(tr);
                table.appendChild(thead);

                data.forEach((item) => {
                    let tr = document.createElement("tr");
                    let vals = Object.values(item);

                    vals.forEach((elem) => {
                        let td = document.createElement("td");
                        td.innerText = elem;
                        tr.appendChild(td);
                    });

                    table.appendChild(tr);
                });

                container.appendChild(table);

                // Generate data for the bar chart
                let roleCounts = {
                    'Top Laner': 0,
                    'Bot Laner': 0,
                    'Mid Laner': 0,
                    'Support': 0,
                    'Jungler': 0,
                };

                let serverCounts = {
                    'KR': 0,
                    'EUW': 0,
                    'EUNE': 0,
                    'TR': 0,
                    'NA': 0
                };

                let genderCounts = {
                    'Male': 0,
                    'Female': 0,
                    'Non-binary': 0,
                    'Polygender': 0,
                    'Genderqueer': 0,
                    'Genderfluid': 0,
                    'Agender': 0,
                    'Bigender': 0
                };

                data.forEach(player => {
                    switch (player['main role']) {
                        case 'Top Laner':
                            roleCounts['Top Laner']++;
                            break;
                        case 'Bot Laner':
                            roleCounts['Bot Laner']++;
                            break;
                        case 'Mid Laner':
                            roleCounts['Mid Laner']++;
                            break;
                        case 'Support':
                            roleCounts['Support']++;
                            break;
                        case 'Jungler':
                            roleCounts['Jungler']++;
                            break;
                    }
                });

                data.forEach(player => {
                    switch (player['server']) {
                        case 'KR':
                            serverCounts['KR']++;
                            break;
                        case 'NA':
                            serverCounts['NA']++;
                            break;
                        case 'EUW':
                            serverCounts['EUW']++;
                            break;
                        case 'EUNE':
                            serverCounts['EUNE']++;
                            break;
                        case 'TR':
                            serverCounts['TR']++;
                            break;
                    }
                });

                data.forEach(player => {
                    switch (player['gender']) {
                        case 'Male':
                            genderCounts['Male']++;
                            break;
                        case 'Female':
                            genderCounts['Female']++;
                            break;
                        case 'Polygender':
                            genderCounts['Polygender']++;
                            break;
                        case 'Genderfluid':
                            genderCounts['Genderfluid']++;
                            break;
                        case 'Genderqueer':
                            genderCounts['Genderqueer']++;
                            break;
                        case 'Non-binary':
                            genderCounts['Non-binary']++;
                            break;
                        case 'Agender':
                            genderCounts['Agender']++;
                            break;
                        case 'Bigender':
                            genderCounts['Bigender']++;
                            break;
                    }
                });

                // Get canvas element for the bar chart
                var ctxRole = document.getElementById('chart1').getContext('2d');

                // Create a bar chart for roles
                new Chart(ctxRole, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(roleCounts),
                        datasets: [{
                            label: 'Role Counts',
                            data: Object.values(roleCounts),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(153, 102, 255, 0.7)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                    }
                });

                // Get canvas element for the doughnut chart
                const ctxDoughnut = document.getElementById('donutChart').getContext('2d');

                // Create a doughnut chart for server counts
                new Chart(ctxDoughnut, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(serverCounts),
                        datasets: [{
                            label: 'Server Counts',
                            data: Object.values(serverCounts),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(153, 102, 255, 0.7)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }
                    }
                });

                // Get canvas element for the pie chart (gender)
                const ctxPie = document.getElementById('pieChart').getContext('2d');

                // Create a pie chart for gender counts
                new Chart(ctxPie, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(genderCounts),
                        datasets: [{
                            label: 'Gender Counts',
                            data: Object.values(genderCounts),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.7)',
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(153, 102, 255, 0.7)',
                                'rgba(255, 159, 64, 0.7)', 
                                'rgba(0, 128, 0, 0.7)', 
                                'rgba(255, 0, 0, 0.7)' 
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }
                    }
                });

                dataDisplayed = true;
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}
