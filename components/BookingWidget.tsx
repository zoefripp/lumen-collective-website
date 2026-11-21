"use client";
import Script from "next/script";

export default function BookingWidget() {
  return (
    <>
      <Script
        src="//widget.simplybook.net/v2/widget/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          new (window as any).SimplybookWidget({
            widget_type: "iframe",
            url: "https://lumencollective.simplybook.net",
            theme: "default",
            theme_settings: {
              timeline_hide_unavailable: "1",
              hide_past_days: "0",
              timeline_show_end_time: "0",
              timeline_modern_display: "as_slots",
              sb_base_color: "#7e9a84",
              display_item_mode: "block",
              booking_nav_bg_color: "#7e9a84",
              body_bg_color: "#f2f2f2",
              sb_review_image: "1",
              sb_review_image_preview:
                "/uploads/lumencollective/image_files/preview/ec6eca1f36c113820a4287de266cd034.jpg",
              dark_font_color: "#474747",
              light_font_color: "#f5fcff",
              btn_color_1: "#ee9a72",
              sb_company_label_color: "#7e9a84",
              hide_img_mode: "1",
              show_sidebar: "1",
              sb_busy: "#ee9a72",
              sb_available: "#7e9a84",
            },
            timeline: "modern",
            datepicker: "top_calendar",
            is_rtl: false,
            app_config: { clear_session: 0, allow_switch_to_ada: 0, predefined: [] },
          });
        }}
      />
    </>
  );
}
