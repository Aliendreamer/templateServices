const REDIS_KEYS = {
    // smartv
    A1BG_SMARTTV_PRODUCTION_CONFIG: "a1bg_smarttv_production_config",
    A1BG_SMARTTV_INTEGRATION_CONFIG: "a1bg_smarttv_integration_config",
    A1BG_SMARTTV_DEVELOPMENT_CONFIG: "a1bg_smarttv_development_config",
    A1AT_SMARTTV_PRODUCTION_CONFIG: "a1at_smarttv_production_config",
    A1AT_SMARTTV_INTEGRATION_CONFIG: "a1at_smarttv_integration_config",
    A1AT_SMARTTV_DEVELOPMENT_CONFIG: "a1at_smarttv_development_config",
    A1HR_SMARTTV_PRODUCTION_CONFIG: "a1hr_smarttv_production_config",
    A1HR_SMARTTV_INTEGRATION_CONFIG: "a1hr_smarttv_integration_config",
    A1HR_SMARTTV_DEVELOPMENT_CONFIG: "a1hr_smarttv_development_config",
    A1MK_SMARTTV_PRODUCTION_CONFIG: "a1mk_smarttv_production_config",
    A1MK_SMARTTV_INTEGRATION_CONFIG: "a1mk_smarttv_integration_config",
    A1MK_SMARTTV_DEVELOPMENT_CONFIG: "a1mk_smarttv_development_config",
    A1SL_SMARTTV_PRODUCTION_CONFIG: "a1sl_smarttv_production_config",
    A1SL_SMARTTV_INTEGRATION_CONFIG: "a1sl_smarttv_integration_config",
    A1SL_SMARTTV_DEVELOPMENT_CONFIG: "a1sl_smarttv_development_config",
    A1RS_SMARTTV_PRODUCTION_CONFIG: "a1rs_smarttv_production_config",
    A1RS_SMARTTV_INTEGRATION_CONFIG: "a1rs_smarttv_integration_config",
    A1RS_SMARTTV_DEVELOPMENT_CONFIG: "a1rs_smarttv_development_config",
    A1BG_SMARTTV_BUSINESS_CONFIG: "a1bg_smarttv_business_config",

    // android
    A1BG_ANDROIDTV_PRODUCTION_CONFIG: "a1bg_androidtv_production_config",
    A1BG_ANDROIDTV_INTEGRATION_CONFIG: "a1bg_androidtv_integration_config",
    A1BG_ANDROIDTV_DEVELOPMENT_CONFIG: "a1bg_androidtv_development_config",
    A1AT_ANDROIDTV_PRODUCTION_CONFIG: "a1at_androidtv_production_config",
    A1AT_ANDROIDTV_INTEGRATION_CONFIG: "a1at_androidtv_integration_config",
    A1AT_ANDROIDTV_DEVELOPMENT_CONFIG: "a1at_androidtv_development_config",
    A1HR_ANDROIDTV_PRODUCTION_CONFIG: "a1hr_androidtv_production_config",
    A1HR_ANDROIDTV_INTEGRATION_CONFIG: "a1hr_androidtv_integration_config",
    A1HR_ANDROIDTV_DEVELOPMENT_CONFIG: "a1hr_androidtv_development_config",
    A1MK_ANDROIDTV_PRODUCTION_CONFIG: "a1mk_androidtv_production_config",
    A1MK_ANDROIDTV_INTEGRATION_CONFIG: "a1mk_androidtv_integration_config",
    A1MK_ANDROIDTV_DEVELOPMENT_CONFIG: "a1mk_androidtv_development_config",
    A1SL_ANDROIDTV_PRODUCTION_CONFIG: "a1sl_androidtv_production_config",
    A1SL_ANDROIDTV_INTEGRATION_CONFIG: "a1sl_androidtv_integration_config",
    A1SL_ANDROIDTV_DEVELOPMENT_CONFIG: "a1sl_androidtv_development_config",
    A1RS_ANDROIDTV_PRODUCTION_CONFIG: "a1rs_androidtv_production_config",
    A1RS_ANDROIDTV_INTEGRATION_CONFIG: "a1rs_androidtv_integration_config",
    A1RS_ANDROIDTV_DEVELOPMENT_CONFIG: "a1rs_androidtv_development_config",
    A1BG_ANDROIDTV_BUSINESS_CONFIG: "a1bg_androidtv_business_config",
    A1AT_SMARTTV_FIRETV_PRODUCTION_CONFIG: "a1at_firetv_production_config",
    A1AT_SMARTTV_FIRETV_INTEGRATION_CONFIG: "a1at_firetv_integration_config",
    A1AT_SMARTTV_FIRETV_DEVELOPMENT_CONFIG: "a1at_firetv_development_config",
    A1HR_FIRETV_DEVELOPMENT_CONFIG: "a1at_firetv_development_config",
    A1HR_FIRETV_INTEGRATION_CONFIG: "a1at_firetv_integration_config",
    A1HR_FIRETV_PRODUCTION_CONFIG: "a1at_firetv_production_config",
};

const ENVIRONMENTS = {
    PRODUCTION: "production",
    INTEGRATION: "integration",
    DEVELOPMENT: "development",
    BUSINESS: "business",
};

const OPCOS = {
    BULGARIA: "a1bg",
    AUSTRIA: "a1at",
    CROATIA: "a1hr",
    MACEDONIA: "a1mk",
    SLOVENIA: "a1sl",
    SERBIA: "a1rs",
};

const DEVICE_TYPES = {
    SMARTTV: "smarttv",
    ANDROIDTV: "androidtv",
    FIRETV: "firetv",
};

const REDIS_KEYS_SUFFIX = "CONFIG";

module.exports = { REDIS_KEYS, REDIS_KEYS_SUFFIX, OPCOS, ENVIRONMENTS, DEVICE_TYPES };
