'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Clock, TrendingUp, FileText, Users, Zap } from 'lucide-react';
import { colors } from '@/lib/theme';

type RiskLevel = 'Low' | 'Medium' | 'High';

type RiskBadgeStyle = {
  bg: string;
  text: string;
  border: string;
};

const getRiskBadgeStyle = (risk: RiskLevel): RiskBadgeStyle => {
  const styles: Record<RiskLevel, RiskBadgeStyle> = {
    Low: { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' },
    Medium: { bg: '#FEFCE8', text: '#854D0E', border: '#FEF08A' },
    High: { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' }
  };

  return styles[risk];
};

type PilotReadiness = {
  sandboxAvailable: boolean;
  securityReviewCompleted: boolean;
  integrationDocsReady: boolean;
  supportSLA: string;
};

const calculateReadinessScore = (readiness: PilotReadiness) => {
  const checks = Object.values(readiness);
  const completed = checks.filter(
    v => v === true || (typeof v === 'string' && v !== '')
  ).length;

  return { completed, total: checks.length };
};

/* =======================
   🔧 SURGICAL BASE STYLES
   ======================= */

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #D1D5DB',
  borderRadius: '8px',
  fontSize: '14px',
  boxSizing: 'border-box' as const,
  background: 'white',
  color: '#111827'
};

const selectStyle = { ...inputStyle };

const secondaryButtonStyle = {
  padding: '12px 24px',
  background: 'white',
  border: '1px solid #D1D5DB',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#111827'
};

function App() {
  const [view, setView] = useState('browse');
  const [anonymousBrowsing, setAnonymousBrowsing] = useState(false);
  const [filters, setFilters] = useState({
    duration: 'all',
    risk: 'all',
    category: 'all'
  });

  const pilots = [
    {
      id: 1,
      company: "PayFlow",
      website: "payflow.io",
      problem: "Payment teams need real-time fraud detection without increasing decline rates.",
      title: "Real-time fraud scoring for high-velocity payments",
      impact: "Reduce fraud by 40% while maintaining 99%+ approval rates for legitimate transactions",
      duration: 60,
      success: ["Process 10k+ transactions", "Measure false positive rate", "Compare vs baseline"],
      integration: "API",
      risk: "Medium",
      incentive: "Free + Revenue share",
      category: "Risk, fraud, compliance",
      team: "Ex-Stripe, Plaid engineers",
      users: "12 fintech companies",
      exclusions: ["No PII required", "No production write access", "Read-only API access"],
      pilotReadiness: {
        sandboxAvailable: true,
        securityReviewCompleted: true,
        integrationDocsReady: true,
        supportSLA: "24h response"
      }
    },
    {
      id: 2,
      company: "DevTrace",
      website: "devtrace.dev",
      problem: "Infrastructure teams lack visibility into microservice performance degradation before incidents.",
      title: "Predictive performance monitoring for microservices",
      impact: "Prevent 80% of performance incidents through early detection",
      duration: 30,
      success: ["Deploy to 3+ services", "Detect degradation 15min+ early", "Zero false alerts"],
      integration: "SDK",
      risk: "Low",
      incentive: "Free for 6 months",
      category: "Analytics & observability",
      team: "Ex-Datadog, New Relic",
      users: "8 YC companies",
      exclusions: ["No data leaves your VPC", "No customer-facing changes", "Zero downtime deployment"],
      pilotReadiness: {
        sandboxAvailable: true,
        securityReviewCompleted: false,
        integrationDocsReady: true,
        supportSLA: "48h response"
      }
    },
    {
      id: 3,
      company: "ChainGuard",
      website: "chainguard.xyz",
      problem: "Web3 teams need automated smart contract monitoring without hiring security engineers.",
      title: "Automated security monitoring for DeFi protocols",
      impact: "Detect vulnerabilities 48hrs before exploitation with zero manual review",
      duration: 90,
      success: ["Monitor 5+ contracts", "Identify 1+ critical issue", "Sub-5min alert time"],
      integration: "API",
      risk: "High",
      incentive: "Co-build + Equity",
      category: "Wallet / payments tooling",
      team: "Trail of Bits alumni",
      users: "Backed by a16z crypto",
      exclusions: ["No private key access", "Read-only blockchain data", "No transaction signing"],
      pilotReadiness: {
        sandboxAvailable: true,
        securityReviewCompleted: true,
        integrationDocsReady: true,
        supportSLA: "12h response"
      }
    }
  ];

  const categories = [
    "Wallet / payments tooling",
    "Risk, fraud, compliance",
    "Analytics & observability",
    "Developer infrastructure",
    "AI tooling (infra-level)",
    "Security & access control"
  ];

  const BrowseView = () => {
    const filteredPilots = pilots
      .filter(p => filters.category === 'all' || p.category === filters.category)
      .filter(p => filters.duration === 'all' || p.duration === Number(filters.duration))
      .filter(p => filters.risk === 'all' || p.risk === filters.risk);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>Active Pilots</h2>
            <p style={{ color: '#111827', margin: 0 }}>Vetted opportunities from crypto, fintech, and dev-tool startups</p>
          </div>
          <button
            onClick={() => setAnonymousBrowsing(!anonymousBrowsing)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              background: 'white',
              color: '#111827',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {anonymousBrowsing ? <EyeOff size={16} /> : <Eye size={16} />}
            {anonymousBrowsing ? 'Anonymous' : 'Public'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <select style={selectStyle} value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            <option value="all">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select style={selectStyle} value={filters.duration} onChange={(e) => setFilters({ ...filters, duration: e.target.value })}>
            <option value="all">All Durations</option>
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
          </select>

          <select style={selectStyle} value={filters.risk} onChange={(e) => setFilters({ ...filters, risk: e.target.value })}>
            <option value="all">All Risk Levels</option>
            <option value="Low">Low (sandbox)</option>
            <option value="Medium">Medium (limited prod)</option>
            <option value="High">High (core flow)</option>
          </select>
        </div>


        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredPilots.map(pilot => {
            const readiness = calculateReadinessScore(pilot.pilotReadiness);
            const riskColors = getRiskBadgeStyle(pilot.risk as RiskLevel);

            return (
              <div key={pilot.id} style={{
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '24px',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{pilot.company}</h3>
                    <span style={{ fontSize: '14px', color: '#111827' }}>{pilot.website}</span>
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#059669',
                      background: '#ECFDF5',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      border: '1px solid #A7F3D0'
                    }}>
                      Pilot Ready: {readiness.completed}/{readiness.total}
                    </span>
                  </div>
                  <p style={{ color: '#374151', margin: 0 }}>{pilot.problem}</p>
                </div>

                <div style={{
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ fontWeight: '600', color: '#1E3A8A', marginBottom: '8px', marginTop: 0 }}>{pilot.title}</h4>
                  <p style={{ color: '#1E40AF', fontSize: '14px', margin: 0 }}>{pilot.impact}</p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#111827" />
                    <span style={{ fontSize: '14px', color: '#374151' }}>{pilot.duration} days</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={16} color="#111827" />
                    <span style={{
                      fontSize: '14px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${riskColors.border}`,
                      background: riskColors.bg,
                      color: riskColors.text
                    }}>
                      {pilot.risk} risk
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={16} color="#111827" />
                    <span style={{ fontSize: '14px', color: '#374151' }}>{pilot.integration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} color="#111827" />
                    <span style={{ fontSize: '14px', color: '#374151' }}>{pilot.incentive}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>Success Criteria:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {pilot.success.map((criterion, i) => (
                      <li key={i} style={{ fontSize: '14px', color: '#374151', display: 'flex', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ color: '#059669' }}>✓</span>
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  marginBottom: '16px',
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>What We Don't Need:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {pilot.exclusions.map((exclusion, i) => (
                      <li key={i} style={{ fontSize: '14px', color: '#374151', display: 'flex', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ color: '#9CA3AF' }}>✗</span>
                        {exclusion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  marginBottom: '16px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  fontSize: '12px'
                }}>
                  <div style={{
                    padding: '8px',
                    borderRadius: '4px',
                    background: pilot.pilotReadiness.sandboxAvailable ? '#F0FDF4' : '#F9FAFB',
                    color: pilot.pilotReadiness.sandboxAvailable ? '#166534' : '#111827'
                  }}>
                    {pilot.pilotReadiness.sandboxAvailable ? '✓' : '○'} Sandbox Available
                  </div>
                  <div style={{
                    padding: '8px',
                    borderRadius: '4px',
                    background: pilot.pilotReadiness.securityReviewCompleted ? '#F0FDF4' : '#F9FAFB',
                    color: pilot.pilotReadiness.securityReviewCompleted ? '#166534' : '#111827'
                  }}>
                    {pilot.pilotReadiness.securityReviewCompleted ? '✓' : '○'} Security Review
                  </div>
                  <div style={{
                    padding: '8px',
                    borderRadius: '4px',
                    background: pilot.pilotReadiness.integrationDocsReady ? '#F0FDF4' : '#F9FAFB',
                    color: pilot.pilotReadiness.integrationDocsReady ? '#166534' : '#111827'
                  }}>
                    {pilot.pilotReadiness.integrationDocsReady ? '✓' : '○'} Integration Docs
                  </div>
                  <div style={{
                    padding: '8px',
                    borderRadius: '4px',
                    background: pilot.pilotReadiness.supportSLA ? '#F0FDF4' : '#F9FAFB',
                    color: pilot.pilotReadiness.supportSLA ? '#166534' : '#111827'
                  }}>
                    {pilot.pilotReadiness.supportSLA ? '✓' : '○'} Support: {pilot.pilotReadiness.supportSLA}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid #E5E7EB',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#374151', flexWrap: 'wrap' }}>
                    <span style={{ background: '#F3F4F6', padding: '4px 8px', borderRadius: '4px' }}>{pilot.category}</span>
                    <span>{pilot.team}</span>
                    <span>{pilot.users}</span>
                  </div>
                  <button style={{
                    padding: '8px 16px',
                    background: '#2563EB',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    Request Pilot Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const CreatePilotView = () => {
    const [formData, setFormData] = useState({
      company: '',
      website: '',
      problem: '',
      pilotTitle: '',
      impact: '',
      duration: '60',
      integration: 'API',
      risk: 'Medium',
      incentive: 'Free'
    });

    return (
      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Create Pilot Listing</h2>
        
        <div style={{
          background: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '24px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Company Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="YourStartup"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  Website *
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="yourstartup.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  Problem Statement (1-2 sentences) *
                </label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                  rows={2}
                  placeholder="What critical problem are you solving?"
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Pilot Definition</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  Pilot Title *
                </label>
                <input
                  type="text"
                  value={formData.pilotTitle}
                  onChange={(e) => setFormData({...formData, pilotTitle: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Clear, specific pilot objective"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  What changes if this works? *
                </label>
                <textarea
                  value={formData.impact}
                  onChange={(e) => setFormData({...formData, impact: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                  rows={2}
                  placeholder="Specific, measurable impact"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Duration *
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Integration Depth *
                  </label>
                  <select
                    value={formData.integration}
                    onChange={(e) => setFormData({...formData, integration: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="None">None</option>
                    <option value="API">API</option>
                    <option value="SDK">SDK</option>
                    <option value="Data access">Data access</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Risk Level *
                  </label>
                  <select
                    value={formData.risk}
                    onChange={(e) => setFormData({...formData, risk: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Low">Low (sandbox only)</option>
                    <option value="Medium">Medium (limited prod)</option>
                    <option value="High">High (core flow)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Incentive *
                  </label>
                  <select
                    value={formData.incentive}
                    onChange={(e) => setFormData({...formData, incentive: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Free">Free</option>
                    <option value="Discount">Discount</option>
                    <option value="Co-build">Co-build</option>
                    <option value="Revenue share">Revenue share</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
            <button
  onClick={async () => {
    await fetch('/api/pilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    alert('Submitted! We’ll be in touch.');
  }}
  style={{
    flex: 1,
    padding: '12px 24px',
    background: '#2563EB',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px'
  }}
>
  Submit for Review
</button>

            <button style={{
              padding: '12px 24px',
              background: 'white',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Save Draft
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ResourcesView = () => (
    <div style={{ maxWidth: '896px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Pilot Resources</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        <div style={{
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '24px',
          background: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <FileText size={32} color="#2563EB" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Standardized Pilot LOI</h3>
          <p style={{ color: '#111827', marginBottom: '16px', fontSize: '14px' }}>
            Letter of Intent template defining scope, timelines, and mutual commitments
          </p>
          <button style={{ color: '#2563EB', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
            Download Template →
          </button>
        </div>

        <div style={{
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '24px',
          background: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Shield size={32} color="#2563EB" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Mutual NDA</h3>
          <p style={{ color: '#111827', marginBottom: '16px', fontSize: '14px' }}>
            Pre-vetted confidentiality agreement for pilot partnerships
          </p>
          <button style={{ color: '#2563EB', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
            Download Template →
          </button>
        </div>

        <div style={{
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '24px',
          background: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Users size={32} color="#2563EB" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Pilot Success Checklist</h3>
          <p style={{ color: '#111827', marginBottom: '16px', fontSize: '14px' }}>
            Week-by-week framework for running effective pilots
          </p>
          <button style={{ color: '#2563EB', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
            Download Checklist →
          </button>
        </div>

        <div style={{
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '24px',
          background: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <TrendingUp size={32} color="#2563EB" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>End-of-Pilot Review</h3>
          <p style={{ color: '#111827', marginBottom: '16px', fontSize: '14px' }}>
            Structured template for evaluating results and next steps
          </p>
          <button style={{ color: '#2563EB', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
            Download Template →
          </button>
        </div>
      </div>

      <div style={{
        marginTop: '32px',
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: '8px',
        padding: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E3A8A', marginBottom: '8px' }}>
          Why Standardized Artifacts Matter
        </h3>
        <p style={{ color: '#1E40AF', margin: 0 }}>
          These templates create shared language between startups and pilot partners, reduce legal friction, 
          set clear expectations, and establish PilotRoom as the default standard for running professional pilots.
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={{ width: '32px', height: '32px' }} role="img" aria-label="PilotRoom logo">
                <path fill="#0B0B0D" d="M 48 32 H 144 V 96 H 96 V 224 H 48 Z M 96 32 H 176 C 204 32 224 52 224 80 C 224 108 204 128 176 128 H 96 Z M 128 128 L 224 224 H 188 L 96 152 Z"/>
              </svg>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 2px 0' }}>PilotRoom</h1>
                <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>Where startups and teams run real pilots</p>
              </div>
            </div>
            <nav style={{ display: 'flex', gap: '24px' }}>
              <button
                onClick={() => setView('browse')}
                style={{
                  fontWeight: '500',
                  color: view === 'browse' ? '#2563EB' : '#111827',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '4px 0'
                }}
              >
                Browse Pilots
              </button>
              <button
                onClick={() => setView('create')}
                style={{
                  fontWeight: '500',
                  color: view === 'create' ? '#2563EB' : '#111827',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '4px 0'
                }}
              >
                Create Pilot
              </button>
              <button
                onClick={() => setView('resources')}
                style={{
                  fontWeight: '500',
                  color: view === 'resources' ? '#2563EB' : '#111827',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '4px 0'
                }}
              >
                Resources
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {view === 'browse' && <BrowseView />}
        {view === 'create' && <CreatePilotView />}
        {view === 'resources' && <ResourcesView />}
      </main>

      <footer style={{ background: 'white', borderTop: '1px solid #E5E7EB', marginTop: '64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            <div>
              <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Focus Niches</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#111827' }}>
                <li style={{ marginBottom: '8px' }}>Crypto & Web3 tooling</li>
                <li style={{ marginBottom: '8px' }}>Fintech infrastructure</li>
                <li style={{ marginBottom: '8px' }}>Developer tools</li>
                <li style={{ marginBottom: '8px' }}>Risk & compliance</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '12px' }}>How It Works</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#111827' }}>
                <li style={{ marginBottom: '8px' }}>Manually curated pilots</li>
                <li style={{ marginBottom: '8px' }}>Vetted introductions</li>
                <li style={{ marginBottom: '8px' }}>Standardized frameworks</li>
                <li style={{ marginBottom: '8px' }}>Anonymous browsing</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Contact</h3>
              <p style={{ fontSize: '14px', color: '#111827', marginBottom: '12px' }}>
                Early access for crypto, fintech, and dev-tool teams
              </p>
              <button style={{
                padding: '8px 16px',
                background: '#2563EB',
                color: 'white',
                fontSize: '14px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                Request Access
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


