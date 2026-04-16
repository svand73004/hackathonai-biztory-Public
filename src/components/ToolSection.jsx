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
    points: [
      "Native support for directory, root stage, and SnowGit imports (March 2026).",
      "Introduction of Interval data types in SQL updates (Preview, March 2026).",
      "New Batch Cortex Search capabilities for Snowflake Cortex (Preview, March 2026).",
      "Enhanced DML error logging for tables to improve debugging.",
      "General availability of the TSS history account usage view.",
      "Support for additional fixed-position numeric format models in SQL.",
      "Advanced natural language to SQL conversion via Cortex Analyst."
    ],
  },
  {
    name: 'Tableau',
    logo: tableauLogo,
    points: [
      "Rule-Based Semantic Model Authoring for smarter insights (March 2026).",
      "Auto-Generate Semantic Models directly from Workspaces (Tableau 2026.1).",
      "Tableau Concierge agentic analytics assistant (Tableau 2025.2).",
      "Enhanced learning capabilities for automated data understanding.",
      "Tableau App for Google Workspace integration.",
      "New tools for Q&A Calibration to test and share insights.",
      "AI-powered automated summaries with Dashboard Narratives."
    ],
  },
  {
    name: 'dbt',
    logo: dbtLogo,
    points: [
      "dbt Fusion Engine: Advanced CI (dbt compare) and performance gains (March 2026).",
      "Native support for Python User-Defined Functions (UDFs) with Snowflake.",
      "Cost Insights: Private beta showing warehouse compute costs and run times.",
      "dbt MCP Server: Search and fetch official documentation in real time.",
      "New Semantic Layer YAML specification for multi-platform metrics.",
      "Beta support for Apache Spark 3.0 in the dbt Fusion engine CLI.",
      "Automatic truncation of long status messages to prevent validation errors."
    ],
  },
  {
    name: 'DuckDB',
    logo: duckdbLogo,
    points: [
      "High-speed analytical queries in-browser via WebAssembly (WASM).",
      "Query Parquet and CSV files directly from S3 and cloud storage.",
      "High-performance analytical engine in a single, zero-dependency binary.",
      "Significant performance boosts and expanded ecosystem integrations.",
      "Comprehensive coverage for advanced window functions and complex joins.",
      "Lightweight architecture ideal for local data exploration and embedded apps.",
      "Deeply integrated with Python and R for seamless data workflows."
    ],
  },
  {
    name: 'Fivetran',
    logo: fivetranLogo,
    points: [
      "Support for secure, encrypted VPN tunnel connections between networks.",
      "Analyze CPU usage and execution time using flamegraphs for SDK syncs.",
      "Connector SDK v2.7.1: Improved logging and critical vulnerability fixes.",
      "SDK v2.7.0 defaults to Python 3.13 for performance profiling compatibility.",
      "API Playground v1.1.4: Upgraded core dependencies like Flask and Faker.",
      "New SDK help command for additional package information and usage.",
      "Managed dbt Core for automated transformations within the Fivetran UI."
    ],
  },
];

const ToolSection = () => {
  return (
    <div className="space-y-12">
      {toolsData.map((tool, index) => (
        <div
          key={tool.name}
          className={`relative overflow-hidden group min-h-[400px] flex flex-col justify-center p-8 md:p-12 rounded-3xl transition-all duration-500 ease-in-out border border-gray-200 shadow-xl
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
              className="w-80 h-80 md:w-[450px] md:h-[450px] object-contain"
            />
          </div>

          {/* Content */}
          <div className={`relative z-10 max-w-2xl w-full ${index % 2 === 0 ? 'mr-auto text-left' : 'ml-auto text-right'}`}>
            <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <h3 className="text-4xl font-black text-purple-900 tracking-tight">{tool.name}</h3>
              <div className="h-1.5 w-16 bg-purple-600 rounded-full" />
            </div>

            <ul className={`space-y-3 ${index % 2 === 0 ? 'text-left' : 'text-right list-inside'}`}>
              {tool.points.map((point, i) => (
                <li key={i} className="text-lg font-semibold text-gray-700 flex items-start gap-2">
                  <span className={`mt-2 h-2 w-2 rounded-full bg-purple-500 flex-shrink-0 ${index % 2 !== 0 ? 'hidden' : ''}`}></span>
                  <span className={index % 2 !== 0 ? 'w-full' : ''}>{point}</span>
                  <span className={`mt-2 h-2 w-2 rounded-full bg-purple-500 flex-shrink-0 ${index % 2 === 0 ? 'hidden' : ''}`}></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolSection;
