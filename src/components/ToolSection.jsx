import React from 'react';
import snowflakeLogo from '../assets/snowflake-logo.png';
import tableauLogo from '../assets/tableau-logo.png';
import dbtLogo from '../assets/dbt-logo.png';
import duckdbLogo from '../assets/duckdb-logo.png';
import fivetranLogo from '../assets/fivetran-logo.png';

const toolsData = [
  {
    name: 'Snowflake',
    logo: snowflakeLogo,
    description: `Snowflake continues to innovate with new features like Snowpark Container Services, allowing you to deploy and run containerized workloads directly within Snowflake. This brings advanced capabilities for ML, AI, and custom applications closer to your data, reducing data movement and improving security. Expect enhanced performance optimizations and expanded governance features across the Data Cloud.`,
  },
  {
    name: 'Tableau',
    logo: tableauLogo,
    description: `Tableau's latest updates focus on augmented analytics and natural language interaction. Ask questions using plain language and let Tableau GPT generate insights and dashboards for you. Deeper integration with Salesforce Data Cloud and improved connectivity to various data sources streamline data preparation and visualization workflows. New collaboration tools also foster better teamwork on dashboards and reports.`,
  },
  {
    name: 'dbt',
    logo: dbtLogo,
    description: `dbt (data build tool) is evolving with native support for Python models and a stronger emphasis on semantic layer capabilities. This allows data teams to define key business metrics once and reuse them across various downstream tools. Performance improvements for large-scale transformations and enhanced testing frameworks ensure more robust and reliable data pipelines.`,
  },
  {
    name: 'DuckDB',
    logo: duckdbLogo,
    description: `DuckDB, the in-process SQL OLAP database, is gaining traction with significant performance boosts and expanded ecosystem integrations. New connectors for popular data formats and cloud storage make it even easier to perform analytical queries directly on your data files without needing a separate server. Its lightweight nature makes it ideal for embedded analytics and local data exploration.`,
  },
  {
    name: 'Fivetran',
    logo: fivetranLogo,
    description: `Fivetran is expanding its connector library and enhancing its data governance features. New connectors for niche applications and improved data lineage capabilities provide greater visibility and control over your data pipelines. Automated data recovery and anomaly detection features ensure higher data quality and reliability, reducing the need for manual intervention.`,
  },
];

const ToolSection = () => {
  return (
    <div className="space-y-12">
      {toolsData.map((tool, index) => (
        <div
          key={tool.name}
          className={`relative overflow-hidden group min-h-[300px] flex flex-col justify-center p-10 rounded-3xl transition-all duration-500 ease-in-out border border-gray-200 shadow-xl
            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          `}
        >
          {/* Large Background Logo */}
          <div 
            className={`absolute z-0 pointer-events-none opacity-10 transition-transform duration-700 group-hover:scale-110
              ${index % 2 === 0 ? '-right-20 -bottom-10 rotate-12' : '-left-20 -top-10 -rotate-12'}
            `}
          >
            <img 
              src={tool.logo} 
              alt="" 
              className="w-80 h-80 md:w-[500px] md:h-[500px] object-contain grayscale-0"
            />
          </div>

          {/* Content */}
          <div className={`relative z-10 max-w-2xl ${index % 2 === 0 ? 'mr-auto text-left' : 'ml-auto text-right'}`}>
            <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <h3 className="text-4xl font-black text-purple-900 tracking-tight">{tool.name}</h3>
              <div className="h-1.5 w-16 bg-purple-600 rounded-full" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold drop-shadow-sm">
              {tool.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolSection;
