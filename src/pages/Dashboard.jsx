import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { getArticles } from '../api/articleApi';
import { getBlogs } from '../api/blogApi';
import { getCareers } from '../api/careerApi';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    articles: 0,
    blogs: 0,
    careers: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [articlesRes, blogsRes, careersRes] = await Promise.all([
          getArticles({ limit: 1 }),
          getBlogs({ limit: 1 }),
          getCareers(),
        ]);

        setMetrics({
          articles: articlesRes.data.data?.totalDocs || 0,
          blogs: blogsRes.data.data?.totalDocs || 0,
          careers: careersRes.data.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <Header />
        <div className="dashboard-header">
          <Typography variant="h4">Dashboard</Typography>
        </div>

        {/* Metrics Section */}
        <Grid container spacing={1}>
          {[
            { title: 'Total Articles', value: metrics.articles, change: '5.0% Up from last month' },
            { title: 'Total Blogs', value: metrics.blogs, change: '3.2% Up from last week' },
            { title: 'Total Careers', value: metrics.careers, change: '1.0% Up from yesterday' },
            { title: 'Total Sales', value: '$0', change: 'N/A' },
          ].map(({ title, value, change }) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Card className="dashboard-card">
                <CardContent className="dashboard-card-content">
                  <Typography variant="h6" className="dashboard-card-title">{title}</Typography>
                  <Typography variant="h4" className="dashboard-card-value">{value}</Typography>
                  <Typography className={`dashboard-card-change ${change.includes('Up') ? 'up' : 'down'}`}>
                    {change}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Sales Details Section */}
        <div className="dashboard-sales">
          <Typography variant="h5">Sales Details</Typography>
          <div className="dashboard-chart">
            <Typography variant="body1">Chart Placeholder</Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;