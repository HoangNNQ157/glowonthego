import React, { useState, useEffect } from 'react';
import RevenueCard from '../../components/admin/RevenueCard';
import CircleStats from '../../components/admin/CircleStats';
import ProductList from '../../components/admin/ProductList';
import DonutChart from '../../components/admin/DonutChart';
import LineChart from '../../components/admin/LineChart';
import BottomText from '../../components/admin/BottomText';
import BottomBar from '../../components/admin/BottomBar';
import OrderService from '../../services/order.service';
import './Dashboard.scss';

// Placeholder for a new BarChart component or direct chart implementation
const RevenueBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Không có dữ liệu doanh thu để hiển thị.</div>;
  }

  const maxRevenue = Math.max(...data.map(d => Math.max(d.currentPeriodRevenue || 0, d.previousPeriodRevenue || 0)));

  return (
    <div className="revenue-chart-container">
      <h3>Biểu đồ doanh thu</h3>
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="bar-group">
            <div
              className="bar current-period-bar"
              style={{
                height: `${(item.currentPeriodRevenue / maxRevenue) * 100}%`,
              }}
              title={`Kỳ hiện tại: ${item.currentPeriodRevenue?.toLocaleString('vi-VN')}đ`}
            ></div>
            <div
              className="bar previous-period-bar"
              style={{
                height: `${(item.previousPeriodRevenue / maxRevenue) * 100}%`,
              }}
              title={`Kỳ trước: ${item.previousPeriodRevenue?.toLocaleString('vi-VN')}đ`}
            ></div>
          </div>
        ))}
      </div>
      <div className="chart-labels">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
      <div className="chart-legend">
        <span className="legend-item"><span className="legend-color current-period-color"></span>Kỳ hiện tại</span>
        <span className="legend-item"><span className="legend-color previous-period-color"></span>Kỳ trước</span>
      </div>
    </div>
  );
};

function Dashboard() {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0); // Assuming API returns total
  const [percentageChange, setPercentageChange] = useState(0); // Assuming API returns percentage change
  const [selectedPeriod, setSelectedPeriod] = useState('day'); // 'day', 'week', 'month', 'year'
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [errorRevenue, setErrorRevenue] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoadingRevenue(true);
      setErrorRevenue(null);
      try {
        // The API logic mentioned day, week, month, year as 'period' query parameter
        const response = await OrderService.getRevenueByPeriod({ period: selectedPeriod });
        // Assuming response.data contains an array for the chart and possibly total/percentage
        // Example structure: { chartData: [{label: '01', currentPeriodRevenue: 1000, previousPeriodRevenue: 800}, ...], total: 123456, percentageChange: 2.1 }
        setRevenueData(response.chartData || []); // Adjust based on actual API response structure
        setTotalRevenue(response.total || 0); // Adjust based on actual API response structure
        setPercentageChange(response.percentageChange || 0); // Adjust based on actual API response structure
      } catch (err) {
        console.error("Error fetching revenue data:", err);
        setErrorRevenue("Không thể tải dữ liệu doanh thu.");
        setRevenueData([]);
        setTotalRevenue(0);
        setPercentageChange(0);
      } finally {
        setLoadingRevenue(false);
      }
    };

    fetchRevenueData();
  }, [selectedPeriod]); // Re-fetch when selectedPeriod changes

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Page</h1>
      <RevenueCard totalRevenue={totalRevenue} percentageChange={percentageChange} /> {/* Pass props to RevenueCard */}

      <div className="period-selector">
        <button onClick={() => handlePeriodChange('day')} className={selectedPeriod === 'day' ? 'active' : ''}>Ngày</button>
        <button onClick={() => handlePeriodChange('week')} className={selectedPeriod === 'week' ? 'active' : ''}>Tuần</button>
        <button onClick={() => handlePeriodChange('month')} className={selectedPeriod === 'month' ? 'active' : ''}>Tháng</button>
        <button onClick={() => handlePeriodChange('year')} className={selectedPeriod === 'year' ? 'active' : ''}>Năm</button>
      </div>

      {loadingRevenue && <div className="loading-message">Đang tải dữ liệu doanh thu...</div>}
      {errorRevenue && <div className="error-message">{errorRevenue}</div>}
      {!loadingRevenue && !errorRevenue && (
        <RevenueBarChart data={revenueData} />
      )}

      <div style={{display: "flex", gap: "20px"}}>
        <CircleStats />
        <ProductList />
      </div>
      <div style={{display: "flex", gap: "20px"}}>
        <DonutChart />
        <LineChart />
      </div>
      <BottomText />
      <BottomBar />
    </div>
  );
}

export default Dashboard; 