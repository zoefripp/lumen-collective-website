"use client";
import Script from "next/script";

export default function BookingWidget() {
  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/zoe-fripp-lumencollective?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=ee9a72"
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
