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

const RevenueBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}></div>;
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
              style={{ height: `${(item.currentPeriodRevenue / maxRevenue) * 100}%` }}
              title={`Kỳ hiện tại: ${item.currentPeriodRevenue?.toLocaleString('vi-VN')}đ`}
            ></div>
            <div
              className="bar previous-period-bar"
              style={{ height: `${(item.previousPeriodRevenue / maxRevenue) * 100}%` }}
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
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [errorRevenue, setErrorRevenue] = useState(null);
  const [item2, setItem2] = useState(null);

  useEffect(() => {
  const fetchRevenueData = async () => {
    setLoadingRevenue(true);
    setErrorRevenue(null);

    try {
      const response = await OrderService.getRevenueByPeriod({ period: selectedPeriod });

      setRevenueData(response.chartData || []);
      setTotalRevenue(response.total || 0);
      setPercentageChange(response.percentageChange || 0);

      // CHỈ cập nhật item2 nếu có
      if (typeof response.item2 === 'number') {
        setItem2(response.item2);
      }

    } catch (err) {
      console.error("Error fetching revenue data:", err);
      setErrorRevenue("Không thể tải dữ liệu doanh thu.");
      setRevenueData([]);
      setTotalRevenue(0);
      setPercentageChange(0);

      // KHÔNG thay đổi item2
    } finally {
      setLoadingRevenue(false);
    }
  };

  fetchRevenueData();
}, [selectedPeriod]);


  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Page</h1>
      <RevenueCard totalRevenue={totalRevenue} percentageChange={percentageChange} />

      <div className="period-selector">
        <button onClick={() => handlePeriodChange('day')} className={selectedPeriod === 'day' ? 'active' : ''}>Ngày</button>
        <button onClick={() => handlePeriodChange('week')} className={selectedPeriod === 'week' ? 'active' : ''}>Tuần</button>
        <button onClick={() => handlePeriodChange('month')} className={selectedPeriod === 'month' ? 'active' : ''}>Tháng</button>
        <button onClick={() => handlePeriodChange('year')} className={selectedPeriod === 'year' ? 'active' : ''}>Năm</button>
      </div>

      {loadingRevenue && <div className="loading-message">Đang tải dữ liệu doanh thu...</div>}

      {errorRevenue && !(item2 > 0) && (
        <div className="error-message">{errorRevenue}</div>
      )}

      {(!loadingRevenue && !errorRevenue) || (item2 > 0) ? (
        <>
          <RevenueBarChart data={revenueData} />
          {item2 !== null && (
            <div className="item2-display">
              <h4>Doanh Thu: {item2.toLocaleString('vi-VN')}đ</h4>
            </div>
          )}
        </>
      ) : null}

      <div style={{ display: "flex", gap: "20px" }}>
        <CircleStats />
        <ProductList />
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <DonutChart />
        <LineChart />
      </div>
      <BottomText />
      <BottomBar />
    </div>
  );
}

export default Dashboard;
