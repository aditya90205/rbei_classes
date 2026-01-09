// Complete course structure with all data
// NOTE: Videos are now fetched from the backend API, not hardcoded here

const createChapters = (titles, courseKey, subjectKey, startingId = 1) =>
  titles.map((title, idx) => ({
    id: startingId + idx,
    title,
    description: title,
    isLocked: idx !== 0,
    videos: [], // Videos will be fetched from backend API
    testPassed: false,
  }));

const frmPart1FoundationChapters = [
  "The Building Blocks of Risk Management",
  "How Do Firms Manage Financial Risk?",
  "The Governance of Risk Management",
  "Credit Risk Transfer Mechanisms",
  "Modern Portfolio Theory and Capital Asset Pricing Model",
  "The Arbitrage Pricing Theory and Multifactor Models of Risk and Return",
  "Principles for Effective Data Aggregation and Risk Reporting",
  "Enterprise Risk Management and Future Trends",
  "Learning from Financial Disasters",
  "Anatomy of the Great Financial Crisis of 2007-2009",
  "GARP Code of Conduct",
];

const frmPart1QuantsChapters = [
  "Sample Moments",
  "Fundamentals of Probability",
  "Random Variables",
  "Common Univariate Random Variables",
  "Multivariate Random Variables",
  "Hypothesis Testing",
  "Linear Regression",
  "Regression with Multiple Explanatory Variables",
  "Regression Diagnostics",
  "Stationary Time Series",
  "Non-Stationary Time Series",
  "Measuring Return, Volatility, and Correlation",
  "Simulation and Bootstrapping",
  "Machine Learning Models",
  "Machine Learning and Prediction",
];

const frmPart1FmpChapters = [
  "Banks",
  "Insurance Companies and Pension Plans",
  "Fund Management",
  "Introduction to Derivatives",
  "Exchanges and OTC Markets",
  "Central Clearing",
  "Futures Markets",
  "Using Futures for Hedging",
  "Foreign Exchange Markets",
  "Pricing Financial Forwards and Futures",
  "Commodity Forwards and Futures",
  "Options Markets",
  "Properties of Options",
  "Trading Strategies",
  "Exotic Options",
  "Properties of Interest Rates",
  "Corporate Bonds",
  "Mortgages and Mortgage-Backed Securities",
  "Interest Rate Futures",
  "Swaps",
];

const frmPart1ValuationChapters = [
  "Measures of Financial Risk",
  "Calculating and Applying VaR",
  "Measuring and Monitoring Volatility",
  "External and Internal Credit Ratings",
  "Country Risk: Determinants, Measures, and Implications",
  "Measuring Credit Risk",
  "Operational Risk",
  "Stress Testing",
  "Pricing Conventions, Discounting, and Arbitrage",
  "Interest Rates",
  "Bond Yields and Return Calculations",
  "Applying Duration, Convexity, and DV01",
  "Modeling Non-Parallel Term Structure Shifts and Hedging",
  "Binomial Trees",
  "The Black-Scholes-Merton Model",
  'Option Sensitivity Measures: The "Greeks"',
];

const frmPart2MarketRiskChapters = [
  "Estimating Market Risk Measures: An Introduction and Overview",
  "Non-Parametric Approaches",
  "Parametric Approaches (II): Extreme Value",
  "Backtesting VaR",
  "VaR Mapping",
  "Messages From the Academic Literature on Risk Measurement for the Trading Book",
  "Correlation Basics: Definitions, Applications, and Terminology",
  "Empirical Properties of Correlation: How Do Correlations Behave in the Real World?",
  "Financial Correlation Modeling-Bottom-Up Approaches",
  "Empirical Approaches to Risk Metrics and Hedging",
  "The Science of Term Structure Models",
  "The Evolution of Short Rates and the Shape of the Term Structure",
  "The Art of Term Structure Models: Drift",
  "The Art of Term Structure Models: Volatility and Distribution",
  "Volatility Smiles",
  "Fundamental Review of the Trading Book",
];

const frmPart2CreditRiskChapters = [
  "Fundamentals of Credit Risk",
  "Governance",
  "Credit Risk Management",
  "Capital Structure in Banks",
  "Introduction to Credit Risk Modeling and Assessment",
  "Credit Scoring and Rating",
  "Credit Scoring and Retail Credit Risk Management",
  "Country Risk: Determinants, Measures, and Implications",
  "Estimating Default Probabilities",
  "Credit Value at Risk",
  "Portfolio Credit Risk",
  "Structured Credit Risk",
  "Credit Risk",
  "Credit Derivatives",
  "Derivatives",
  "Counterparty Risk and Beyond",
  "Netting, Close-Out, and Related Aspects",
  "Margin (Collateral) and Settlement",
  "Central Clearing",
  "Future Value and Exposure",
  "CVA",
  "The Evolution of Stress Testing Counterparty Exposures",
  "An Introduction to Securitization",
];

const frmPart2OperationalRiskChapters = [
  "Introduction to Operational Risk and Resilience",
  "Risk Governance",
  "Risk Identification",
  "Risk Measurement and Assessment",
  "Risk Mitigation",
  "Risk Reporting",
  "Integrated Risk Management",
  "Cyber-Resilience: Range of Practices",
  "Case Study: Cyberthreats and Information Security Risks",
  "Sound Management of Risks Related to Money Laundering and Financing of Terrorism",
  "Case Study: Financial Crime and Fraud",
  "Guidance on Managing Outsourcing Risk",
  "Case Study: Third-Party Risk Management",
  "Case Study: Investor Protection and Compliance Risks in Investment Activities",
  "Supervisory Guidance on Model Risk Management",
  "Case Study: Model Risk and Model Validation",
  "Stress Testing Banks",
  "Risk Capital Attribution and Risk-Adjusted Performance Measurement",
  "Range of Practices and Issues in Economic Capital Frameworks",
  "Capital Planning at Large Bank Holding Companies: Supervisory Expectations and Range of Current Practice",
  "Capital Regulation Before the Global Financial Crisis",
  "Solvency, Liquidity, and Other Regulation After the Global Financial Crisis",
  "High-Level Summary of Basel III Reforms",
  "Basel III: Finalizing Post-Crisis Reforms",
];

const frmPart2LiquidityRiskChapters = [
  "Liquidity Risk",
  "Liquidity and Leverage",
  "Early Warning Indicators",
  "The Investment Function in Financial-Services Management",
  "Liquidity and Reserves Management: Strategies and Policies",
  "Intraday Liquidity Risk Management",
  "Monitoring Liquidity",
  "The Failure Mechanics of Dealer Banks",
  "Liquidity Stress Testing",
  "Liquidity Risk Reporting and Stress Testing",
  "Contingency Funding Planning",
  "Managing and Pricing Deposit Services",
  "Managing Nondeposit Liabilities",
  "Repurchase Agreements and Financing",
  "Liquidity Transfer Pricing: A Guide to Better Practice",
  "The US Dollar Shortage in Global Banking and the International Policy Response",
  "Covered Interest Parity Lost: Understanding the Cross-Currency Basis",
  "Risk Management for Changing Interest Rates: Asset-Liability Management and Duration Techniques",
  "Illiquid Assets",
];

const frmPart2PortfolioManagementChapters = [
  "Factor Theory",
  "Factors",
  "Alpha (and the Low-Risk Anomaly)",
  "Portfolio Construction",
  "Portfolio Risk: Analytical Methods",
  "VaR and Risk Budgeting in Investment Management",
  "Risk Monitoring and Performance Measurement",
  "Portfolio Performance Evaluation",
  "Hedge Funds",
  "Performing Due Diligence on Specific Managers and Funds",
  "Predicting Fraud by Investment Managers",
];

const frmPart2CurrentIssuesChapters = [
  "Review of the Federal Reserve's Supervision and Regulation of Silicon Valley Bank",
  "The Credit Suisse CoCo Wipeout: Facts, Misperceptions, and Lessons for Financial Regulation",
  "Artificial Intelligence and Bank Supervision",
  "Financial Risk Management and Explainable, Trustworthy, Responsible AI",
  "Artificial Intelligence Risk Management Framework",
  "Climate-Related Risk Drivers and Their Transmission Channels",
  "Climate-Related Financial Risks-Measurement Methodologies",
  "Principles for the Effective Management and Supervision of Climate-Related Financial Risks",
  "The Crypto Ecosystem: Key Elements and Risks",
  "Digital Resilience and Financial Stability: The Quest for Policy Tools in the Financial Sector",
];

const cfaLevel1Derivatives = [
  "Derivative Instrument And Derivative Market Features",
  "Forward Commitment And Contingent Claim Features And Instruments",
  "Derivative Benefits, Risks, And Issuer And Investor Uses",
  "Arbitrage, Replication, And The Cost Of Carry In Pricing Derivatives",
  "Pricing And Valuation Of Forward Contracts And For An Underlying With Varying Maturities",
  "Pricing And Valuation For Future Contracts",
  "Pricing And Valuation Of Interest Rates And Other Swaps",
  "Pricing And Valuation Of Options",
  "Option Replication Using Put-Call Parity",
  "Valuing A Derivative Using A One Period Binomial Model",
];

const cfaLevel1FixedIncome = [
  "Fixed-Income Instrument Features",
  "Fixed-Income Cash Flows and Types",
  "Fixed-Income Issuance and Trading",
  "Fixed-Income Markets for Corporate Issuers",
  "Fixed-Income Markets for Government Issuers",
  "Fixed-Income Bond Valuation: Prices and Yields",
  "Yield and Yield Spread Measures for Fixed-Rate Bonds",
  "Yield and Yield Spread Measures for Floating-Rate Instruments",
  "The Term Structure of Interest Rates: Spot, Par, and",
  "Interest Rate Risk and Return",
  "Yield-Based Bond Duration Measures and Pro",
  "Yield-Based Bond Convexity and Portfolio Prot",
  "Curve-Based and Empirical Fixed-Income Risk",
  "Credit Risk",
  "Credit Analysis for Government Issuers",
  "Credit Analysis for Corporate Issuers",
  "Fixed-Income Securitization",
  "Asset-Backed Security (ABS) Instrument",
  "Mortgage-Backed Security (MBS) Instrument",
];

const cfaLevel1Equity = [
  "Market Organization And Structure",
  "Security Market Indexes",
  "Market Efficiency",
  "Overview Of Equity Securities",
  "Company Analysis: Past And Present",
  "Industry And Competitive Analvsis",
  "Company Analysis: Forecasting",
  "Equity Valuation: Concepts And Basic Tools",
];

const cfaLevel1Portfolio = [
  "Portfolio Risk And Return: Part 1",
  "Portfolio Risk And Return: Part 2",
  "Portfolio Management: An Overview",
  "Basics Of Portfolio Planning And Construction",
  "The Behavioral Biases Of Individuals",
  "Introduction To Risk Management",
];

const cfaLevel1Quants = [
  "Rates and Returns",
  "The Time Value of Money in Finance",
  "Statistical Measures of Asset Returns",
  "Probability Trees and Conditional Expectation:",
  "Portfolio Mathematics",
  "Simulation Methods",
  "Estimation and Inference",
  "Hypothesis Testing",
  "Parametric and Non-Parametric Tests of Inder",
  "Simple Linear Regression",
  "Introduction to Big Data Techniques",
];

const cfaLevel1Fsa = [
  "Introduction Of Financial Statement Analysis",
  "Analyzing Income Statements",
  "Analyzing Balance Sheet",
  "Analyzing Statements Of Cash Flows 1",
  "Analyzing Statement Of Cash Flows 2",
  "Analysis Of Inventories",
  "Analysis Of Long Term Assets",
  "Topics In Long-Term Liabilities And Equity",
  "Analysis Of Income Taxes",
  "Financial Reporting Quality",
  "Financial Analysis Techniques",
  "Introduction To Financial Statement Modeling",
];

const cfaLevel1Economics = [
  "Firms And Market Structure",
  "Understanding Business Cycles",
  "Fiscal Policy",
  "Monetary Policy",
  "Introduction To Geopolictics",
  "International Trade",
  "Capital Flows And The FX Market",
  "Exchange Rate Calculations",
];

const cfaLevel1CorporateIssuer = [
  "Organization Forms, Corporate Issuer Features And Ownership",
  "Investors And Other Stakeholders",
  "Corporate Governance: Conflicts, Mechanisms, Risks, And Benefits",
  "Working Capital And Liquidity",
  "Capital Investments And Capital Allocation",
  "Capital Structure",
  "Business Models",
];

const cfaLevel1Alternative = [
  "Alternative Investment Features, Methods and Structures",
  "Alternative Investment: Performance and Returns",
  "Investments In Private Capital: Equity And Debt",
  "Real Estate And Infrastructure",
  "Natural Resources",
  "Hedge Funds",
  "Introduction To Digital Assets",
];

const cfaLevel1Ethics = [
  "Ethics And Trust In The Investment Profession",
  "Code Of Ethics And Standards Of Professional",
  "Guidance For Standards I-VII",
  "Introduction To The Global Investment Perfor",
  "Ethics Application",
];

const cfaLevel2Derivatives = [
  "Pricing and Valuation of Forward Commitments",
  "Valuation of Contingent Claims",
];

const cfaLevel2FixedIncome = [
  "The Term Structure and Interest Rate Dynamics",
  "The Arbitrage-Free Valuation Framework",
  "Valuation and Analysis of Bonds with Embedded Options",
  "Credit Analysis Models",
  "Credit Default Swaps",
];

const cfaLevel2Equity = [
  "Equity Valuation: Applications and Processes",
  "Discounted Dividend Valuation",
  "Free Cash Flow Valuation",
  "Market-Based Valuation: Price and Enterprise Value Multiples",
  "Residual Income Valuation",
  "Private Company Valuation",
];

const cfaLevel2Fsa = [
  "Intercorporate Investments",
  "Employee Compensation: Post-Employment and Share-Based",
  "Multinational Operations",
  "Analysis of Financial Institutions",
  "Evaluating Quality of Financial Reports",
  "Integration of Financial Statement Analysis Techniques",
];

const cfaLevel2CorporateIssuer = [
  "Analysis of Dividends and Share Repurchases",
  "Environmental, Social, and Governance (ESG) Considerations in Investment Analysis",
  "Cost of Capital: Advanced Topics",
  "Corporate Restructuring",
];

const cfaLevel2Economics = [
  "Currency Exchange Rates: Understanding Equilibrium Value",
  "Economic Growth",
];

const cfaLevel2Portfolio = [
  "Economics and Investment Markets",
  "Analysis of Active Portfolio Management",
  "Exchange-Traded Funds: Mechanics and Applications",
  "Using Mutilfactor Models",
  "Measuring and Managing Market Risk",
  "Backtesting and Simulation",
];

const cfaLevel2Quants = [
  "Multiple Regression",
  "Time-Series Analysis",
  "Machine Learning",
  "Big Data Projects",
];

const cfaLevel2Alternative = [
  "Introduction to Commodities and Commodity Derivatives",
  "Overview of Types of Real Estate Investment",
  "Investments in Real Estate Through Publicly Traded Securities",
  "Hedge Fund Strategies",
];

const cfaLevel2Ethics = [
  "Code of Ethics and Standards of Professional Conduct and Guidance for Standards I-VII",
  "Application of the Code and Standards: Level II",
];

const cfaLevel3AssetAllocation = [
  "Capital Market Expectations, Part 1: Framework and Macro Considerations",
  "Capital Market Expectations, Part 2: Forecasting Asset Class Returns",
  "Principles of Asset Allocation",
  "Asset Allocation with Real-World Constraints",
  "Asset Class Returns",
];

const cfaLevel3PortfolioConstruction = [
  "Overview of Equity Portfolio Management",
  "Overview of Fixed-Income Portfolio Management",
  "Asset Allocation to Alternative Investments",
  "An Overview of Private Wealth Management",
  "Portfolio Management for Institutional Investors",
  "Trading Costs and Electronic Markets",
  "Case Study in Portfolio Management: Institutional (SWF)",
  "Portfolio Performance Evaluation",
  "Investment Manager Selection",
  "Overview of the Global Investment Performance Standards",
];

const cfaLevel3DerivativesRisk = [
  "Options Strategies",
  "Swaps, Forwards, and Futures Strategies",
  "Currency Management: An Introduction",
];

const cfaLevel3Ethics = [
  "Code of Ethics and Standards of Professional Conduct",
  "Application of the Code and Standards: Level III",
  "Asset Manager Code of Professional Conduct",
];

const cfaLevel3PrivateMarkets = [
  "Private Investments and Structures",
  "General Partner and Investor Perspectives and the Investment Process",
  "Private Equity",
  "Private Debt",
  "Private Special Situations",
  "Private Real Estate Investments",
  "Infrastructure Investments",
];

const cfaLevel3PortfolioManagement = [
  "Index-Based Equity Strategies",
  "Active Equity Investing: Strategies",
  "Active Equity Investing: Portfolio Construction",
  "Liability-Driven and Index-Based Strategies",
  "Yield Curve Strategies",
  "Fixed-Income Active Management: Credit Strategies",
  "Trade Strategy and Execution",
  "Case Study in Portfolio Management: Institutional",
];

export const coursesData = [
  {
    id: 1,
    key: "cfa-level-1",
    title: "CFA Level 1",
    description: "Chartered Financial Analyst Level 1 certification course",
    thumbnail: "bg-blue-500",
    duration: "6 months",
    students: 345,
    subjects: [
      {
        id: 1,
        title: "Derivatives",
        description: "Core derivative instruments and pricing basics",
        chapters: createChapters(cfaLevel1Derivatives, "cfa1", "derivatives"),
      },
      {
        id: 2,
        title: "Fixed Income",
        description: "Debt instruments, valuation, and credit analysis",
        chapters: createChapters(cfaLevel1FixedIncome, "cfa1", "fixed-income"),
      },
      {
        id: 3,
        title: "Equity",
        description: "Equity markets, valuation, and analysis",
        chapters: createChapters(cfaLevel1Equity, "cfa1", "equity"),
      },
      {
        id: 4,
        title: "Portfolio Management",
        description: "Portfolio theory and construction fundamentals",
        chapters: createChapters(cfaLevel1Portfolio, "cfa1", "portfolio"),
      },
      {
        id: 5,
        title: "Quantitative Methods",
        description: "Quant tools for investment analysis",
        chapters: createChapters(cfaLevel1Quants, "cfa1", "quants"),
      },
      {
        id: 6,
        title: "Financial Reporting and Analysis",
        description: "Financial statements and analysis techniques",
        chapters: createChapters(cfaLevel1Fsa, "cfa1", "fsa"),
      },
      {
        id: 7,
        title: "Economics",
        description: "Micro, macro, and global economic concepts",
        chapters: createChapters(cfaLevel1Economics, "cfa1", "economics"),
      },
      {
        id: 8,
        title: "Corporate Issuer",
        description: "Corporate finance, governance, and capital decisions",
        chapters: createChapters(
          cfaLevel1CorporateIssuer,
          "cfa1",
          "corporate-issuer"
        ),
      },
      {
        id: 9,
        title: "Alternative Investments",
        description: "Non-traditional asset classes and structures",
        chapters: createChapters(cfaLevel1Alternative, "cfa1", "alternative"),
      },
      {
        id: 10,
        title: "Ethics",
        description: "Ethical and professional standards",
        chapters: createChapters(cfaLevel1Ethics, "cfa1", "ethics"),
      },
    ],
  },
  {
    id: 2,
    key: "cfa-level-2",
    title: "CFA Level 2",
    description: "Chartered Financial Analyst Level 2 certification course",
    thumbnail: "bg-purple-500",
    duration: "6 months",
    students: 278,
    subjects: [
      {
        id: 1,
        title: "Derivatives",
        description: "Pricing and valuation of derivatives",
        chapters: createChapters(cfaLevel2Derivatives, "cfa2", "derivatives"),
      },
      {
        id: 2,
        title: "Fixed Income",
        description: "Advanced fixed-income valuation and credit",
        chapters: createChapters(cfaLevel2FixedIncome, "cfa2", "fixed-income"),
      },
      {
        id: 3,
        title: "Equity",
        description: "Equity valuation techniques and applications",
        chapters: createChapters(cfaLevel2Equity, "cfa2", "equity"),
      },
      {
        id: 4,
        title: "Financial Reporting and Analysis",
        description: "Complex reporting topics and analysis",
        chapters: createChapters(cfaLevel2Fsa, "cfa2", "fsa"),
      },
      {
        id: 5,
        title: "Corporate Issuer",
        description: "Capital structure, ESG, and restructuring",
        chapters: createChapters(
          cfaLevel2CorporateIssuer,
          "cfa2",
          "corporate-issuer"
        ),
      },
      {
        id: 6,
        title: "Economics",
        description: "Global macro topics relevant to investments",
        chapters: createChapters(cfaLevel2Economics, "cfa2", "economics"),
      },
      {
        id: 7,
        title: "Portfolio Management",
        description: "Portfolio analysis, risk, and performance",
        chapters: createChapters(cfaLevel2Portfolio, "cfa2", "portfolio"),
      },
      {
        id: 8,
        title: "Quantitative Methods",
        description: "Applied statistics and modeling",
        chapters: createChapters(cfaLevel2Quants, "cfa2", "quants"),
      },
      {
        id: 9,
        title: "Alternative Investments",
        description: "Real assets and hedge fund strategies",
        chapters: createChapters(cfaLevel2Alternative, "cfa2", "alternative"),
      },
      {
        id: 10,
        title: "Ethics",
        description: "Ethical and professional standards",
        chapters: createChapters(cfaLevel2Ethics, "cfa2", "ethics"),
      },
    ],
  },
  {
    id: 3,
    key: "cfa-level-3",
    title: "CFA Level 3",
    description: "Chartered Financial Analyst Level 3 certification course",
    thumbnail: "bg-pink-500",
    duration: "6 months",
    students: 156,
    subjects: [
      {
        id: 1,
        title: "Asset Allocation",
        description: "Capital market expectations and allocation",
        chapters: createChapters(
          cfaLevel3AssetAllocation,
          "cfa3",
          "asset-allocation"
        ),
      },
      {
        id: 2,
        title: "Portfolio Construction and Performance Measurement",
        description: "Portfolio design and performance evaluation",
        chapters: createChapters(
          cfaLevel3PortfolioConstruction,
          "cfa3",
          "portfolio-construction"
        ),
      },
      {
        id: 3,
        title: "Derivatives and Risk Management",
        description: "Derivatives strategies and risk control",
        chapters: createChapters(
          cfaLevel3DerivativesRisk,
          "cfa3",
          "derivatives-risk"
        ),
      },
      {
        id: 4,
        title: "Ethical and Professional Standards",
        description: "Ethics for investment professionals",
        chapters: createChapters(cfaLevel3Ethics, "cfa3", "ethics"),
      },
      {
        id: 5,
        title: "Private Markets",
        description: "Private investments and structures",
        chapters: createChapters(
          cfaLevel3PrivateMarkets,
          "cfa3",
          "private-markets"
        ),
      },
      {
        id: 6,
        title: "Portfolio Management",
        description: "Equity and fixed-income portfolio tactics",
        chapters: createChapters(
          cfaLevel3PortfolioManagement,
          "cfa3",
          "portfolio-management"
        ),
      },
    ],
  },
  {
    id: 4,
    key: "frm-part-1",
    title: "FRM Part 1",
    description: "Financial Risk Manager Part 1 certification",
    thumbnail: "bg-orange-500",
    duration: "4 months",
    students: 289,
    subjects: [
      {
        id: 1,
        title: "Foundation",
        description: "Core foundations of risk management",
        chapters: createChapters(
          frmPart1FoundationChapters,
          "frm1",
          "foundation"
        ),
      },
      {
        id: 2,
        title: "Quants",
        description: "Quantitative methods for risk",
        chapters: createChapters(frmPart1QuantsChapters, "frm1", "quants"),
      },
      {
        id: 3,
        title: "FMP",
        description: "Financial markets and products",
        chapters: createChapters(frmPart1FmpChapters, "frm1", "fmp"),
      },
      {
        id: 4,
        title: "Valuation",
        description: "Valuation and risk measurement",
        chapters: createChapters(
          frmPart1ValuationChapters,
          "frm1",
          "valuation"
        ),
      },
    ],
  },
  {
    id: 5,
    key: "frm-part-2",
    title: "FRM Part 2",
    description: "Financial Risk Manager Part 2 certification",
    thumbnail: "bg-red-500",
    duration: "4 months",
    students: 201,
    subjects: [
      {
        id: 1,
        title: "Market Risk",
        description: "Market risk measurement and management",
        chapters: createChapters(
          frmPart2MarketRiskChapters,
          "frm2",
          "market-risk"
        ),
      },
      {
        id: 2,
        title: "Credit Risk",
        description: "Credit risk frameworks and products",
        chapters: createChapters(
          frmPart2CreditRiskChapters,
          "frm2",
          "credit-risk"
        ),
      },
      {
        id: 3,
        title: "Operational Risk",
        description: "Operational risk and resilience",
        chapters: createChapters(
          frmPart2OperationalRiskChapters,
          "frm2",
          "operational-risk"
        ),
      },
      {
        id: 4,
        title: "Liquidity Risk",
        description: "Liquidity planning and stress testing",
        chapters: createChapters(
          frmPart2LiquidityRiskChapters,
          "frm2",
          "liquidity-risk"
        ),
      },
      {
        id: 5,
        title: "Portfolio Management",
        description: "Portfolio construction and oversight",
        chapters: createChapters(
          frmPart2PortfolioManagementChapters,
          "frm2",
          "portfolio-management"
        ),
      },
      {
        id: 6,
        title: "Current Issues",
        description: "Emerging topics and case studies",
        chapters: createChapters(
          frmPart2CurrentIssuesChapters,
          "frm2",
          "current-issues"
        ),
      },
    ],
  },
];

// Test questions database
export const testQuestionsData = {
  1: [
    // Chapter 1: Code of Ethics
    {
      id: 1,
      question: "Which of the following is NOT part of the CFA Code of Ethics?",
      options: [
        "A) Act with integrity, competence, and diligence",
        "B) Focus on achieving maximum personal profit",
        "C) Place the interests of clients above personal interests",
        "D) Maintain and enhance professional competence",
      ],
      correctAnswer: "B",
    },
    {
      id: 2,
      question:
        "The Standards of Professional Conduct are organized into how many major sections?",
      options: ["A) 5", "B) 7", "C) 9", "D) 11"],
      correctAnswer: "B",
    },
    {
      id: 3,
      question:
        "Which standard requires members to maintain independence and objectivity?",
      options: [
        "A) Standard I",
        "B) Standard II",
        "C) Standard III",
        "D) Standard IV",
      ],
      correctAnswer: "B",
    },
    {
      id: 4,
      question: "What is the primary purpose of the CFA Code of Ethics?",
      options: [
        "A) To maximize profits",
        "B) To protect the public and maintain the integrity of the investment profession",
        "C) To provide legal protection",
        "D) To eliminate competition",
      ],
      correctAnswer: "B",
    },
    {
      id: 5,
      question: "CFA members are required to uphold the highest standards of:",
      options: [
        "A) Profit margins",
        "B) Client satisfaction",
        "C) Ethical conduct and professional excellence",
        "D) Market dominance",
      ],
      correctAnswer: "C",
    },
    {
      id: 6,
      question: "Which of the following best describes 'integrity'?",
      options: [
        "A) Maximizing returns",
        "B) Being honest and having strong moral principles",
        "C) Following government regulations",
        "D) Achieving high market share",
      ],
      correctAnswer: "B",
    },
    {
      id: 7,
      question: "The CFA Code of Ethics applies to:",
      options: [
        "A) Only large financial institutions",
        "B) Only investment managers",
        "C) All CFA members worldwide",
        "D) Only those working with high-net-worth clients",
      ],
      correctAnswer: "C",
    },
    {
      id: 8,
      question:
        "What should a CFA member do if aware of a colleague's unethical conduct?",
      options: [
        "A) Ignore it",
        "B) Report directly to the media",
        "C) Address it according to appropriate procedures",
        "D) Keep it confidential",
      ],
      correctAnswer: "C",
    },
    {
      id: 9,
      question: "Professional competence includes:",
      options: [
        "A) Only theoretical knowledge",
        "B) Knowledge, skill, and ability to perform duties",
        "C) Just years of experience",
        "D) Only academic degrees",
      ],
      correctAnswer: "B",
    },
    {
      id: 10,
      question: "The concept of fair dealing requires:",
      options: [
        "A) Treating all clients equally regardless of fees",
        "B) Giving some clients preferential treatment",
        "C) Treating clients fairly and not taking undue advantage",
        "D) Ignoring smaller clients",
      ],
      correctAnswer: "C",
    },
    {
      id: 11,
      question: "CFA members must disclose:",
      options: [
        "A) Nothing about their activities",
        "B) All conflicts of interest",
        "C) Only financial conflicts",
        "D) Conflicts only to the CFA Institute",
      ],
      correctAnswer: "B",
    },
    {
      id: 12,
      question: "Misrepresentation in CFA context includes:",
      options: [
        "A) Claiming qualifications you don't have",
        "B) Overstating investment expertise",
        "C) Falsifying credentials",
        "D) All of the above",
      ],
      correctAnswer: "D",
    },
    {
      id: 13,
      question: "What is the minimum ethical standard for member conduct?",
      options: [
        "A) Legal compliance only",
        "B) CFA Code of Ethics and Standards of Professional Conduct",
        "C) Following market practices",
        "D) Maximizing personal benefits",
      ],
      correctAnswer: "B",
    },
    {
      id: 14,
      question: "Confidentiality of client information:",
      options: [
        "A) Can be breached for profit",
        "B) Is optional",
        "C) Must be maintained unless legally required otherwise",
        "D) Should be disclosed to competitors",
      ],
      correctAnswer: "C",
    },
    {
      id: 15,
      question: "The CFA Code prioritizes the interests of:",
      options: [
        "A) The CFA Institute",
        "B) Market participants and the public",
        "C) Only wealthy clients",
        "D) Employers exclusively",
      ],
      correctAnswer: "B",
    },
  ],
  // You can add more questions for other chapters following the same structure
};
