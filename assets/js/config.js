/**
 * ZENVIX AUTOMATION - Shared Configuration & Helpers
 * Owner-supplied business details and WhatsApp URL builder.
 */

const CONFIG = {
  businessName: "ZENVIX AUTOMATION",
  tagline: "Innovation in Motion",
  founder: "Kunal Jha",
  coFounder: "Ashish Chettri",
  location: "Siliguri, West Bengal, India",
  whatsappNumber: "918509352128",
  phones: [
    { display: "+91 85093 52128", raw: "+918509352128" },
    { display: "+91 89063 67958", raw: "+918906367958" }
  ],
  email: "zenvixautomation@gmail.com",
  defaultWhatsAppMessage: "Hi Zenvix, I’d like to know more about your automation services.",
  
  /**
   * Helper to build wa.me URL
   * @param {string} message - Unencoded message string
   * @returns {string} - Full WhatsApp URL
   */
  buildWhatsAppUrl: function (message) {
    const text = message || this.defaultWhatsAppMessage;
    return "https://wa.me/" + this.whatsappNumber + "?text=" + encodeURIComponent(text);
  },

  /**
   * Helper to build service quote URL
   * @param {string} serviceName - Exact name of the service
   * @returns {string} - WhatsApp URL
   */
  buildServiceQuoteUrl: function (serviceName) {
    const msg = "Hi Zenvix, I’d like to enquire about " + serviceName + ". Please share the details.";
    return this.buildWhatsAppUrl(msg);
  }
};

// Export to window if running in browser
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
