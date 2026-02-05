import { useState } from "react";

export function HomePage() {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <>
      <EverythingInControlSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <EmailReimaginedSection />
    </>
  );
}

const EverythingInControlSection = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const tabs = [
    { id: "analytics", label: "Intuitive Analytics" },
    { id: "visibility", label: "Full Visibility" },
    { id: "authentication", label: "Domain Authentication" },
  ];

  const tabContent = {
    analytics: {
      metrics: [
        { label: "Sent", value: "45,231", change: "+12.5%", positive: true },
        {
          label: "Delivered",
          value: "44,892",
          change: "+11.2%",
          positive: true,
        },
        {
          label: "Opened",
          value: "28,456",
          change: "+8.3%",
          positive: true,
        },
        {
          label: "Clicked",
          value: "12,847",
          change: "+15.7%",
          positive: true,
        },
      ],
    },
    visibility: {
      logs: [
        { status: "delivered", to: "john@example.com", time: "2 min ago" },
        { status: "opened", to: "sarah@company.io", time: "5 min ago" },
        { status: "clicked", to: "mike@startup.com", time: "8 min ago" },
        { status: "bounced", to: "invalid@test.com", time: "12 min ago" },
      ],
    },
    authentication: {
      records: [
        {
          type: "SPF",
          status: "verified",
          value: "v=spf1 include:resend.com ~all",
        },
        { type: "DKIM", status: "verified", value: "resend._domainkey" },
        {
          type: "DMARC",
          status: "verified",
          value: "v=DMARC1; p=quarantine",
        },
      ],
    },
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-medium tracking-[-0.03em] leading-[1.1] mb-4 md:mb-5">
            Everything in your control
          </h2>
          <p className="text-zinc-500 text-[15px] md:text-[17px] max-w-[600px] mx-auto leading-[1.6]">
            All the features you need to manage your email sending, troubleshoot
            with
            <span className="hidden md:inline">
              <br />
            </span>{" "}
            detailed logs, and protect your domain reputation – without the
            friction.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-2.5 mb-8 md:mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[13px] md:text-[14px] font-medium
                transition-all duration-200 ease-out
                ${
                  activeTab === tab.id
                    ? "bg-blue-400 text-white"
                    : "bg-transparent text-zinc-500 hover:text-blue-400 border border-zinc-300 hover:border-blue-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-b from-blue-400/10 via-transparent to-transparent rounded-[32px] blur-2xl pointer-events-none" />

          {/* Dashboard Container */}
          <div className="relative bg-white rounded-xl md:rounded-2xl border border-zinc-200 overflow-hidden shadow-lg">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 border-b border-zinc-200 bg-zinc-50">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-300" />
                  <div className="w-3 h-3 rounded-full bg-zinc-300" />
                  <div className="w-3 h-3 rounded-full bg-zinc-300" />
                </div>
                <span className="text-[13px] text-zinc-500 hidden sm:block">
                  Resend Dashboard — Overview
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="text-[13px]">acme.com</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 md:p-6 lg:p-8">
              {/* Analytics Tab */}
              {activeTab === "analytics" && (
                <div
                  className="space-y-5 md:space-y-6 animate-fadeIn"
                  key="analytics"
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {tabContent.analytics.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-zinc-50 rounded-xl p-4 md:p-5 border border-zinc-200 hover:border-blue-300 transition-colors duration-300"
                      >
                        <p className="text-zinc-500 text-[12px] md:text-[13px] mb-1.5">
                          {metric.label}
                        </p>
                        <p className="text-[22px] md:text-[26px] lg:text-[30px] font-semibold tracking-[-0.02em]">
                          {metric.value}
                        </p>
                        <p
                          className={`text-[12px] md:text-[13px] mt-1.5 ${metric.positive ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {metric.change}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-5 md:p-6 border border-zinc-200 h-44 md:h-56 flex items-end justify-between gap-1.5 md:gap-2">
                    {[65, 45, 78, 52, 88, 67, 92, 55, 73, 81, 60, 85].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-400 to-blue-400 rounded-t-sm opacity-80 hover:opacity-100 transition-all duration-200 chart-bar"
                          style={{ height: `${height}%` }}
                        />
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Visibility Tab */}
              {activeTab === "visibility" && (
                <div
                  className="space-y-3 animate-fadeIn"
                  key="visibility"
                >
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <h3 className="text-[16px] md:text-[17px] font-medium">
                      Email Logs
                    </h3>
                    <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      Live
                    </div>
                  </div>
                  {tabContent.visibility.logs.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3.5 md:p-4 bg-zinc-50 rounded-xl border border-zinc-200 hover:border-blue-300 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <StatusBadge status={log.status} />
                        <span className="text-[13px] md:text-[14px]">
                          {log.to}
                        </span>
                      </div>
                      <span className="text-[12px] md:text-[13px] text-zinc-500">
                        {log.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Authentication Tab */}
              {activeTab === "authentication" && (
                <div
                  className="space-y-3 animate-fadeIn"
                  key="authentication"
                >
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <h3 className="text-[16px] md:text-[17px] font-medium">
                      DNS Records
                    </h3>
                    <span className="text-[11px] md:text-[12px] text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full font-medium">
                      All Verified
                    </span>
                  </div>
                  {tabContent.authentication.records.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3.5 md:p-4 bg-zinc-50 rounded-xl border border-zinc-200 hover:border-blue-300 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className="text-[12px] md:text-[13px] font-mono bg-zinc-100 px-2.5 md:px-3 py-1 rounded font-medium">
                          {record.type}
                        </span>
                        <span className="text-[12px] md:text-[13px] text-zinc-500 hidden md:block font-mono truncate max-w-[300px]">
                          {record.value}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-emerald-400"
                        >
                          <path
                            d="M13.5 4.5L6 12L2.5 8.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[12px] md:text-[13px] text-emerald-400 font-medium">
                          Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    delivered: "bg-emerald-500/15 text-emerald-400",
    opened: "bg-blue-500/15 text-blue-400",
    clicked: "bg-purple-500/15 text-purple-400",
    bounced: "bg-red-500/15 text-red-400",
  };
  return (
    <span
      className={`text-[11px] md:text-[12px] px-2.5 py-1 rounded-full capitalize font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const EmailReimaginedSection = () => {
  return (
    <section className="py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-white pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-medium tracking-[-0.03em] leading-[1.05] mb-7 md:mb-9">
            Email reimagined. Available today.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href="/signup"
              className="w-full sm:w-auto px-7 md:px-8 py-3 md:py-3.5 bg-blue-400 text-white rounded-lg font-medium text-[14px] md:text-[15px] hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto px-7 md:px-8 py-3 md:py-3.5 bg-transparent text-blue-400 rounded-lg font-medium text-[14px] md:text-[15px] border border-blue-400 hover:border-blue-700 hover:bg-blue-50 transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
