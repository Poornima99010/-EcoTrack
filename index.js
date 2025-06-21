<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoTrack - কার্বন ফুটপ্রিন্ট ড্যাশবোর্ড</title>
    <!-- External CSS Link -->
    <link rel="stylesheet" href="style.css">
    <!-- Chart.js CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🌱 EcoTrack</h1>
            <p>আপনার কার্বন ফুটপ্রিন্ট ট্র্যাক করুন এবং পৃথিবীকে বাঁচাতে সাহায্য করুন</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">সাপ্তাহিক নিঃসরণ</div>
                        <div class="stat-value" id="weeklyEmissions">28.2 kg</div>
                    </div>
                    <div class="stat-icon icon-green">🌱</div>
                </div>
            </div>

            <div class="stat-card blue">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">লক্ষ্যের অগ্রগতি</div>
                        <div class="stat-value" id="goalProgress">56%</div>
                    </div>
                    <div class="stat-icon icon-blue">🎯</div>
                </div>
            </div>

            <div class="stat-card yellow">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">লগ করা কার্যকলাপ</div>
                        <div class="stat-value" id="activitiesCount">12</div>
                    </div>
                    <div class="stat-icon icon-yellow">📊</div>
                </div>
            </div>

            <div class="stat-card purple">
                <div class="stat-header">
                    <div>
                        <div class="stat-title">ইকো স্কোর</div>
                        <div class="stat-value" id="ecoScore">ভালো</div>
                    </div>
                    <div class="stat-icon icon-purple">🏆</div>
                </div>
            </div>
        </div>

        <!-- Charts -->
        <div class="charts-grid">
            <div class="chart-card">
                <div class="chart-title">সাপ্তাহিক নিঃসরণের ট্রেন্ড</div>
                <canvas id="weeklyChart" width="400" height="200"></canvas>
            </div>

            <div class="chart-card">
                <div class="chart-title">বিভাগ অনুযায়ী নিঃসরণ</div>
                <canvas id="categoryChart" width="400" height="200"></canvas>
            </div>
        </div>

        <!-- Add Activity & Recent Activities -->
        <div class="content-grid">
            <!-- Add New Activity -->
            <div class="chart-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div class="chart-title">নতুন কার্যকলাপ যোগ করুন</div>
                    <button class="btn btn-primary" onclick="toggleAddForm()">➕ কার্যকলাপ যোগ</button>
                </div>

                <div id="addActivityForm" class="add-activity-form hidden">
                    <div class="form-group">
                        <label class="form-label">বিভাগ</label>
                        <select id="activityType" class="form-select" onchange="updateActivityOptions()">
                            <option value="transport">পরিবহন</option>
                            <option value="energy">শক্তি</option>
                            <option value="food">খাদ্য</option>
                            <option value="travel">ভ্রমণ</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">কার্যকলাপ</label>
                        <select id="activityName" class="form-select">
                            <option value="">কার্যকলাপ নির্বাচন করুন...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" id="amountLabel">পরিমাণ (কিমি)</label>
                        <input type="number" id="activityAmount" class="form-input" placeholder="পরিমাণ লিখুন">
                    </div>

                    <div class="btn-group">
                        <button class="btn btn-primary" onclick="addActivity()">যোগ করুন</button>
                        <button class="btn btn-secondary" onclick="toggleAddForm()"> বাতিল করুন</button>
                    </div>
                </div>
            </div>

            <!-- Recent Activities -->
            <div class="chart-card">
                <div class="chart-title">সাম্প্রতিক কার্যকলাপ</div>
                <div class="activity-list" id="activityList">
                    <!-- Activities will be populated here by JavaScript -->
                </div>
            </div>
        </div>

        <!-- Goal Setting -->
        <div class="goal-section">
            <div class="chart-title">সাপ্তাহিক লক্ষ্য নির্ধারণ</div>
            <div class="goal-controls">
                <label style="font-weight: 500; color: #374151;">সাপ্তাহিক CO2 লক্ষ্য (কেজি):</label>
                <input type="number" id="weeklyGoal" class="goal-input" value="50" onchange="updateGoalProgress()">
                <div id="goalStatus" class="goal-status good">🎉 সঠিক পথে!</div>
            </div>
            <div class="progress-bar">
                <div id="progressFill" class="progress-fill good" style="width: 56%"></div>
            </div>
        </div>
    </div>

    <!-- External JavaScript Link -->
    <script src="script.js"></script>
</body>
</html>
