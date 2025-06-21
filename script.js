// Data storage
let activities = [
    { id: 1, date: '2025-06-11', type: 'transport', activity: 'গাড়িতে ভ্রমণ', amount: 25, emissions: 5.5 },
    { id: 2, date: '2025-06-10', type: 'energy', activity: 'বাড়ির বিদ্যুৎ', amount: 12, emissions: 8.4 },
    { id: 3, date: '2025-06-09', type: 'food', activity: 'মাংসের খাবার', amount: 1, emissions: 6.1 },
    { id: 4, date: '2025-06-08', type: 'transport', activity: 'পাবলিক ট্রান্সপোর্ট', amount: 15, emissions: 1.2 },
    { id: 5, date: '2025-06-07', type: 'food', activity: 'মুরগির খাবার', amount: 2, emissions: 3.8 },
    { id: 6, date: '2025-06-06', type: 'transport', activity: 'সাইকেল', amount: 10, emissions: 0 },
    { id: 7, date: '2025-06-05', type: 'energy', activity: 'সোলার পাওয়ার', amount: 8, emissions: 0.4 }
];

let weeklyGoal = 50;

// Activity options (in Bengali)
const activityOptions = {
    transport: ['গাড়িতে ভ্রমণ', 'পাবলিক ট্রান্সপোর্ট', 'সাইকেল', 'হেঁটে যাওয়া', 'ইলেকট্রিক গাড়ি'],
    energy: ['বাড়ির বিদ্যুৎ', 'সোলার পাওয়ার'],
    food: ['মাংসের খাবার', 'মুরগির খাবার', 'নিরামিষ খাবার', 'ভেগান খাবার'],
    travel: ['অভ্যন্তরীণ ফ্লাইট', 'আন্তর্জাতিক ফ্লাইট']
};

// Emission factors
const emissionFactors = {
    transport: {
        'গাড়িতে ভ্রমণ': 0.22,
        'পাবলিক ট্রান্সপোর্ট': 0.08,
        'সাইকেল': 0,
        'হেঁটে যাওয়া': 0,
        'ইলেকট্রিক গাড়ি': 0.05
    },
    energy: {
        'বাড়ির বিদ্যুৎ': 0.7,
        'সোলার পাওয়ার': 0.05
    },
    food: {
        'মাংসের খাবার': 6.1,
        'মুরগির খাবার': 1.9,
        'নিরামিষ খাবার': 0.4,
        'ভেগান খাবার': 0.2
    },
    travel: {
        'অভ্যন্তরীণ ফ্লাইট': 0.25,
        'আন্তর্জাতিক ফ্লাইট': 0.3
    }
};

// Initialize charts
let weeklyChart, categoryChart;

function initializeCharts() {
    // Weekly Trend Chart
    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    const weeklyData = getWeeklyData();
    
    weeklyChart = new Chart(weeklyCtx, {
        type: 'line',
        data: {
            labels: weeklyData.labels,
            datasets: [{
                label: 'দৈনিক নিঃসরণ (কেজি CO2)',
                data: weeklyData.data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryData = getCategoryData();
    
    categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.data,
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6']
            }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
}

function getWeeklyData() {
    // This is sample data. A real app would calculate this from the 'activities' array.
    const days = ['সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি', 'রবি'];
    let dailyEmissions = [0,0,0,0,0,0,0]; // Sun-Sat
    activities.forEach(act => {
        const dayOfWeek = new Date(act.date).getDay();
        dailyEmissions[dayOfWeek] += act.emissions;
    });
    // Re-order to Mon-Sun
    const reorderedEmissions = [...dailyEmissions.slice(1), dailyEmissions[0]];

    return { labels: days, data: reorderedEmissions };
}

function getCategoryData() {
    const categories = {};
    const categoryNames = {
        transport: 'পরিবহন',
        energy: 'শক্তি',
        food: 'খাদ্য',
        travel: 'ভ্রমণ'
    };

    activities.forEach(activity => {
        const category = categoryNames[activity.type] || activity.type;
        categories[category] = (categories[category] || 0) + activity.emissions;
    });
    
    return {
        labels: Object.keys(categories),
        data: Object.values(categories)
    };
}

function updateActivityOptions() {
    const type = document.getElementById('activityType').value;
    const activitySelect = document.getElementById('activityName');
    const amountLabel = document.getElementById('amountLabel');
    
    activitySelect.innerHTML = '<option value="">কার্যকলাপ নির্বাচন করুন...</option>';
    
    activityOptions[type].forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        activitySelect.appendChild(optionElement);
    });
    
    const units = { transport: 'কিমি', energy: 'kWh', food: 'সার্ভিং', travel: 'কিমি' };
    amountLabel.textContent = পরিমাণ (${units[type]});
}

function toggleAddForm() {
    const form = document.getElementById('addActivityForm');
    form.classList.toggle('hidden');
    if (!form.classList.contains('hidden')) {
        updateActivityOptions();
    }
}

function addActivity() {
    const type = document.getElementById('activityType').value;
    const activity = document.getElementById('activityName').value;
    const amount = parseFloat(document.getElementById('activityAmount').value);
    
    if (!activity || isNaN(amount) || amount <= 0) {
        alert('অনুগ্রহ করে সমস্ত ঘর সঠিকভাবে পূরণ করুন');
        return;
    }
    
    const emissions = Math.round((emissionFactors[type][activity] || 0) * amount * 10) / 10;
    
    const newActivity = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        type: type,
        activity: activity,
        amount: amount,
        emissions: emissions
    };
    
    activities.unshift(newActivity);
    
    document.getElementById('activityName').value = '';
    document.getElementById('activityAmount').value = '';
    toggleAddForm();
    
    updateAllDisplays();
}

function updateStats() {
    const totalEmissions = activities.reduce((sum, act) => sum + act.emissions, 0);
    const goalProgress = Math.round((totalEmissions / weeklyGoal) * 100);
    
    document.getElementById('weeklyEmissions').textContent = ${(Math.round(totalEmissions * 10) / 10).toLocaleString('bn-BD')} কেজি;
    document.getElementById('goalProgress').textContent = ${goalProgress.toLocaleString('bn-BD')}%;
    document.getElementById('activitiesCount').textContent = activities.length.toLocaleString('bn-BD');
    document.getElementById('ecoScore').textContent = goalProgress <= 80 ? 'ভালো' : goalProgress <= 100 ? 'মোটামুটি' : 'খারাপ';
}

function updateGoalProgress() {
    const totalEmissions = activities.reduce((sum, act) => sum + act.emissions, 0);
    const goal = parseFloat(document.getElementById('weeklyGoal').value) || 50;
    const progress = (totalEmissions / goal) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const goalStatus = document.getElementById('goalStatus');
    
    progressFill.style.width = ${Math.min(progress, 100)}%;
    
    if (progress <= 80) {
        progressFill.className = 'progress-fill good';
        goalStatus.className = 'goal-status good';
        goalStatus.textContent = '🎉 সঠিক পথে!';
    } else if (progress <= 100) {
        progressFill.className = 'progress-fill warning';
        goalStatus.className = 'goal-status warning';
        goalStatus.textContent = '⚠ লক্ষ্যের কাছাকাছি';
    } else {
        progressFill.className = 'progress-fill danger';
        goalStatus.className = 'goal-status danger';
        goalStatus.textContent = '🚨 লক্ষ্য ছাড়িয়ে গেছে';
    }
    
    weeklyGoal = goal;
    updateStats();
}

function updateActivityList() {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';
    
    activities.slice(0, 8).forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const icons = { transport: '🚗', energy: '🏠', food: '🍽', travel: '✈' };
        
        activityItem.innerHTML = `
            <div class="activity-info">
                <div class="activity-icon">${icons[activity.type]}</div>
                <div class="activity-details">
                    <h4>${activity.activity}</h4>
                    <p>${new Date(activity.date).toLocaleDateString('bn-BD')}</p>
                </div>
            </div>
            <div class="activity-emissions">
                <div class="value">${activity.emissions.toLocaleString('bn-BD')} কেজি</div>
                <div class="unit">CO2</div>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

function updateCharts() {
    const weeklyData = getWeeklyData();
    weeklyChart.data.labels = weeklyData.labels;
    weeklyChart.data.datasets[0].data = weeklyData.data;
    weeklyChart.update();
    
    const categoryData = getCategoryData();
    categoryChart.data.labels = categoryData.labels;
    categoryChart.data.datasets[0].data = categoryData.data;
    categoryChart.update();
}

function updateAllDisplays() {
    updateStats();
    updateActivityList();
    updateCharts();
    updateGoalProgress();
}

// Initialize everything when page loads
window.onload = function() {
    initializeCharts();
    updateAllDisplays();
    updateActivityOptions(); // To populate the dropdown initially
};
