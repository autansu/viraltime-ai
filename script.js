/* =========================================================
   ViralTime AI — script.js
   Client-side recommendation engine + UI
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Country list (195+) with IANA timezone ---------- */
  var COUNTRIES = [
    { name: "Afghanistan", code: "AF", flag: "🇦🇫", tz: "Asia/Kabul" },
    { name: "Albania", code: "AL", flag: "🇦🇱", tz: "Europe/Tirane" },
    { name: "Algeria", code: "DZ", flag: "🇩🇿", tz: "Africa/Algiers" },
    { name: "Andorra", code: "AD", flag: "🇦🇩", tz: "Europe/Andorra" },
    { name: "Angola", code: "AO", flag: "🇦🇴", tz: "Africa/Luanda" },
    { name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬", tz: "America/Antigua" },
    { name: "Argentina", code: "AR", flag: "🇦🇷", tz: "America/Argentina/Buenos_Aires" },
    { name: "Armenia", code: "AM", flag: "🇦🇲", tz: "Asia/Yerevan" },
    { name: "Australia", code: "AU", flag: "🇦🇺", tz: "Australia/Sydney" },
    { name: "Austria", code: "AT", flag: "🇦🇹", tz: "Europe/Vienna" },
    { name: "Azerbaijan", code: "AZ", flag: "🇦🇿", tz: "Asia/Baku" },
    { name: "Bahamas", code: "BS", flag: "🇧🇸", tz: "America/Nassau" },
    { name: "Bahrain", code: "BH", flag: "🇧🇭", tz: "Asia/Bahrain" },
    { name: "Bangladesh", code: "BD", flag: "🇧🇩", tz: "Asia/Dhaka" },
    { name: "Barbados", code: "BB", flag: "🇧🇧", tz: "America/Barbados" },
    { name: "Belarus", code: "BY", flag: "🇧🇾", tz: "Europe/Minsk" },
    { name: "Belgium", code: "BE", flag: "🇧🇪", tz: "Europe/Brussels" },
    { name: "Belize", code: "BZ", flag: "🇧🇿", tz: "America/Belize" },
    { name: "Benin", code: "BJ", flag: "🇧🇯", tz: "Africa/Porto-Novo" },
    { name: "Bhutan", code: "BT", flag: "🇧🇹", tz: "Asia/Thimphu" },
    { name: "Bolivia", code: "BO", flag: "🇧🇴", tz: "America/La_Paz" },
    { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦", tz: "Europe/Sarajevo" },
    { name: "Botswana", code: "BW", flag: "🇧🇼", tz: "Africa/Gaborone" },
    { name: "Brazil", code: "BR", flag: "🇧🇷", tz: "America/Sao_Paulo" },
    { name: "Brunei", code: "BN", flag: "🇧🇳", tz: "Asia/Brunei" },
    { name: "Bulgaria", code: "BG", flag: "🇧🇬", tz: "Europe/Sofia" },
    { name: "Burkina Faso", code: "BF", flag: "🇧🇫", tz: "Africa/Ouagadougou" },
    { name: "Burundi", code: "BI", flag: "🇧🇮", tz: "Africa/Bujumbura" },
    { name: "Cabo Verde", code: "CV", flag: "🇨🇻", tz: "Atlantic/Cape_Verde" },
    { name: "Cambodia", code: "KH", flag: "🇰🇭", tz: "Asia/Phnom_Penh" },
    { name: "Cameroon", code: "CM", flag: "🇨🇲", tz: "Africa/Douala" },
    { name: "Canada", code: "CA", flag: "🇨🇦", tz: "America/Toronto" },
    { name: "Central African Republic", code: "CF", flag: "🇨🇫", tz: "Africa/Bangui" },
    { name: "Chad", code: "TD", flag: "🇹🇩", tz: "Africa/Ndjamena" },
    { name: "Chile", code: "CL", flag: "🇨🇱", tz: "America/Santiago" },
    { name: "China", code: "CN", flag: "🇨🇳", tz: "Asia/Shanghai" },
    { name: "Colombia", code: "CO", flag: "🇨🇴", tz: "America/Bogota" },
    { name: "Comoros", code: "KM", flag: "🇰🇲", tz: "Indian/Comoro" },
    { name: "Congo (Brazzaville)", code: "CG", flag: "🇨🇬", tz: "Africa/Brazzaville" },
    { name: "Congo (Kinshasa)", code: "CD", flag: "🇨🇩", tz: "Africa/Kinshasa" },
    { name: "Costa Rica", code: "CR", flag: "🇨🇷", tz: "America/Costa_Rica" },
    { name: "Croatia", code: "HR", flag: "🇭🇷", tz: "Europe/Zagreb" },
    { name: "Cuba", code: "CU", flag: "🇨🇺", tz: "America/Havana" },
    { name: "Cyprus", code: "CY", flag: "🇨🇾", tz: "Asia/Nicosia" },
    { name: "Czechia", code: "CZ", flag: "🇨🇿", tz: "Europe/Prague" },
    { name: "Denmark", code: "DK", flag: "🇩🇰", tz: "Europe/Copenhagen" },
    { name: "Djibouti", code: "DJ", flag: "🇩🇯", tz: "Africa/Djibouti" },
    { name: "Dominica", code: "DM", flag: "🇩🇲", tz: "America/Dominica" },
    { name: "Dominican Republic", code: "DO", flag: "🇩🇴", tz: "America/Santo_Domingo" },
    { name: "Ecuador", code: "EC", flag: "🇪🇨", tz: "America/Guayaquil" },
    { name: "Egypt", code: "EG", flag: "🇪🇬", tz: "Africa/Cairo" },
    { name: "El Salvador", code: "SV", flag: "🇸🇻", tz: "America/El_Salvador" },
    { name: "Equatorial Guinea", code: "GQ", flag: "🇬🇶", tz: "Africa/Malabo" },
    { name: "Eritrea", code: "ER", flag: "🇪🇷", tz: "Africa/Asmara" },
    { name: "Estonia", code: "EE", flag: "🇪🇪", tz: "Europe/Tallinn" },
    { name: "Eswatini", code: "SZ", flag: "🇸🇿", tz: "Africa/Mbabane" },
    { name: "Ethiopia", code: "ET", flag: "🇪🇹", tz: "Africa/Addis_Ababa" },
    { name: "Fiji", code: "FJ", flag: "🇫🇯", tz: "Pacific/Fiji" },
    { name: "Finland", code: "FI", flag: "🇫🇮", tz: "Europe/Helsinki" },
    { name: "France", code: "FR", flag: "🇫🇷", tz: "Europe/Paris" },
    { name: "Gabon", code: "GA", flag: "🇬🇦", tz: "Africa/Libreville" },
    { name: "Gambia", code: "GM", flag: "🇬🇲", tz: "Africa/Banjul" },
    { name: "Georgia", code: "GE", flag: "🇬🇪", tz: "Asia/Tbilisi" },
    { name: "Germany", code: "DE", flag: "🇩🇪", tz: "Europe/Berlin" },
    { name: "Ghana", code: "GH", flag: "🇬🇭", tz: "Africa/Accra" },
    { name: "Greece", code: "GR", flag: "🇬🇷", tz: "Europe/Athens" },
    { name: "Grenada", code: "GD", flag: "🇬🇩", tz: "America/Grenada" },
    { name: "Guatemala", code: "GT", flag: "🇬🇹", tz: "America/Guatemala" },
    { name: "Guinea", code: "GN", flag: "🇬🇳", tz: "Africa/Conakry" },
    { name: "Guinea-Bissau", code: "GW", flag: "🇬🇼", tz: "Africa/Bissau" },
    { name: "Guyana", code: "GY", flag: "🇬🇾", tz: "America/Guyana" },
    { name: "Haiti", code: "HT", flag: "🇭🇹", tz: "America/Port-au-Prince" },
    { name: "Honduras", code: "HN", flag: "🇭🇳", tz: "America/Tegucigalpa" },
    { name: "Hong Kong", code: "HK", flag: "🇭🇰", tz: "Asia/Hong_Kong" },
    { name: "Hungary", code: "HU", flag: "🇭🇺", tz: "Europe/Budapest" },
    { name: "Iceland", code: "IS", flag: "🇮🇸", tz: "Atlantic/Reykjavik" },
    { name: "India", code: "IN", flag: "🇮🇳", tz: "Asia/Kolkata" },
    { name: "Indonesia", code: "ID", flag: "🇮🇩", tz: "Asia/Jakarta" },
    { name: "Iran", code: "IR", flag: "🇮🇷", tz: "Asia/Tehran" },
    { name: "Iraq", code: "IQ", flag: "🇮🇶", tz: "Asia/Baghdad" },
    { name: "Ireland", code: "IE", flag: "🇮🇪", tz: "Europe/Dublin" },
    { name: "Israel", code: "IL", flag: "🇮🇱", tz: "Asia/Jerusalem" },
    { name: "Italy", code: "IT", flag: "🇮🇹", tz: "Europe/Rome" },
    { name: "Jamaica", code: "JM", flag: "🇯🇲", tz: "America/Jamaica" },
    { name: "Japan", code: "JP", flag: "🇯🇵", tz: "Asia/Tokyo" },
    { name: "Jordan", code: "JO", flag: "🇯🇴", tz: "Asia/Amman" },
    { name: "Kazakhstan", code: "KZ", flag: "🇰🇿", tz: "Asia/Almaty" },
    { name: "Kenya", code: "KE", flag: "🇰🇪", tz: "Africa/Nairobi" },
    { name: "Kiribati", code: "KI", flag: "🇰🇮", tz: "Pacific/Tarawa" },
    { name: "Kosovo", code: "XK", flag: "🇽🇰", tz: "Europe/Belgrade" },
    { name: "Kuwait", code: "KW", flag: "🇰🇼", tz: "Asia/Kuwait" },
    { name: "Kyrgyzstan", code: "KG", flag: "🇰🇬", tz: "Asia/Bishkek" },
    { name: "Laos", code: "LA", flag: "🇱🇦", tz: "Asia/Vientiane" },
    { name: "Latvia", code: "LV", flag: "🇱🇻", tz: "Europe/Riga" },
    { name: "Lebanon", code: "LB", flag: "🇱🇧", tz: "Asia/Beirut" },
    { name: "Lesotho", code: "LS", flag: "🇱🇸", tz: "Africa/Maseru" },
    { name: "Liberia", code: "LR", flag: "🇱🇷", tz: "Africa/Monrovia" },
    { name: "Libya", code: "LY", flag: "🇱🇾", tz: "Africa/Tripoli" },
    { name: "Liechtenstein", code: "LI", flag: "🇱🇮", tz: "Europe/Vaduz" },
    { name: "Lithuania", code: "LT", flag: "🇱🇹", tz: "Europe/Vilnius" },
    { name: "Luxembourg", code: "LU", flag: "🇱🇺", tz: "Europe/Luxembourg" },
    { name: "Madagascar", code: "MG", flag: "🇲🇬", tz: "Indian/Antananarivo" },
    { name: "Malawi", code: "MW", flag: "🇲🇼", tz: "Africa/Blantyre" },
    { name: "Malaysia", code: "MY", flag: "🇲🇾", tz: "Asia/Kuala_Lumpur" },
    { name: "Maldives", code: "MV", flag: "🇲🇻", tz: "Indian/Maldives" },
    { name: "Mali", code: "ML", flag: "🇲🇱", tz: "Africa/Bamako" },
    { name: "Malta", code: "MT", flag: "🇲🇹", tz: "Europe/Malta" },
    { name: "Marshall Islands", code: "MH", flag: "🇲🇭", tz: "Pacific/Majuro" },
    { name: "Mauritania", code: "MR", flag: "🇲🇷", tz: "Africa/Nouakchott" },
    { name: "Mauritius", code: "MU", flag: "🇲🇺", tz: "Indian/Mauritius" },
    { name: "Mexico", code: "MX", flag: "🇲🇽", tz: "America/Mexico_City" },
    { name: "Micronesia", code: "FM", flag: "🇫🇲", tz: "Pacific/Pohnpei" },
    { name: "Moldova", code: "MD", flag: "🇲🇩", tz: "Europe/Chisinau" },
    { name: "Monaco", code: "MC", flag: "🇲🇨", tz: "Europe/Monaco" },
    { name: "Mongolia", code: "MN", flag: "🇲🇳", tz: "Asia/Ulaanbaatar" },
    { name: "Montenegro", code: "ME", flag: "🇲🇪", tz: "Europe/Podgorica" },
    { name: "Morocco", code: "MA", flag: "🇲🇦", tz: "Africa/Casablanca" },
    { name: "Mozambique", code: "MZ", flag: "🇲🇿", tz: "Africa/Maputo" },
    { name: "Myanmar", code: "MM", flag: "🇲🇲", tz: "Asia/Yangon" },
    { name: "Namibia", code: "NA", flag: "🇳🇦", tz: "Africa/Windhoek" },
    { name: "Nauru", code: "NR", flag: "🇳🇷", tz: "Pacific/Nauru" },
    { name: "Nepal", code: "NP", flag: "🇳🇵", tz: "Asia/Kathmandu" },
    { name: "Netherlands", code: "NL", flag: "🇳🇱", tz: "Europe/Amsterdam" },
    { name: "New Zealand", code: "NZ", flag: "🇳🇿", tz: "Pacific/Auckland" },
    { name: "Nicaragua", code: "NI", flag: "🇳🇮", tz: "America/Managua" },
    { name: "Niger", code: "NE", flag: "🇳🇪", tz: "Africa/Niamey" },
    { name: "Nigeria", code: "NG", flag: "🇳🇬", tz: "Africa/Lagos" },
    { name: "North Korea", code: "KP", flag: "🇰🇵", tz: "Asia/Pyongyang" },
    { name: "North Macedonia", code: "MK", flag: "🇲🇰", tz: "Europe/Skopje" },
    { name: "Norway", code: "NO", flag: "🇳🇴", tz: "Europe/Oslo" },
    { name: "Oman", code: "OM", flag: "🇴🇲", tz: "Asia/Muscat" },
    { name: "Pakistan", code: "PK", flag: "🇵🇰", tz: "Asia/Karachi" },
    { name: "Palau", code: "PW", flag: "🇵🇼", tz: "Pacific/Palau" },
    { name: "Palestine", code: "PS", flag: "🇵🇸", tz: "Asia/Gaza" },
    { name: "Panama", code: "PA", flag: "🇵🇦", tz: "America/Panama" },
    { name: "Papua New Guinea", code: "PG", flag: "🇵🇬", tz: "Pacific/Port_Moresby" },
    { name: "Paraguay", code: "PY", flag: "🇵🇾", tz: "America/Asuncion" },
    { name: "Peru", code: "PE", flag: "🇵🇪", tz: "America/Lima" },
    { name: "Philippines", code: "PH", flag: "🇵🇭", tz: "Asia/Manila" },
    { name: "Poland", code: "PL", flag: "🇵🇱", tz: "Europe/Warsaw" },
    { name: "Portugal", code: "PT", flag: "🇵🇹", tz: "Europe/Lisbon" },
    { name: "Qatar", code: "QA", flag: "🇶🇦", tz: "Asia/Qatar" },
    { name: "Romania", code: "RO", flag: "🇷🇴", tz: "Europe/Bucharest" },
    { name: "Russia", code: "RU", flag: "🇷🇺", tz: "Europe/Moscow" },
    { name: "Rwanda", code: "RW", flag: "🇷🇼", tz: "Africa/Kigali" },
    { name: "Saint Kitts and Nevis", code: "KN", flag: "🇰🇳", tz: "America/St_Kitts" },
    { name: "Saint Lucia", code: "LC", flag: "🇱🇨", tz: "America/St_Lucia" },
    { name: "Saint Vincent and the Grenadines", code: "VC", flag: "🇻🇨", tz: "America/St_Vincent" },
    { name: "Samoa", code: "WS", flag: "🇼🇸", tz: "Pacific/Apia" },
    { name: "San Marino", code: "SM", flag: "🇸🇲", tz: "Europe/San_Marino" },
    { name: "Sao Tome and Principe", code: "ST", flag: "🇸🇹", tz: "Africa/Sao_Tome" },
    { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", tz: "Asia/Riyadh" },
    { name: "Senegal", code: "SN", flag: "🇸🇳", tz: "Africa/Dakar" },
    { name: "Serbia", code: "RS", flag: "🇷🇸", tz: "Europe/Belgrade" },
    { name: "Seychelles", code: "SC", flag: "🇸🇨", tz: "Indian/Mahe" },
    { name: "Sierra Leone", code: "SL", flag: "🇸🇱", tz: "Africa/Freetown" },
    { name: "Singapore", code: "SG", flag: "🇸🇬", tz: "Asia/Singapore" },
    { name: "Slovakia", code: "SK", flag: "🇸🇰", tz: "Europe/Bratislava" },
    { name: "Slovenia", code: "SI", flag: "🇸🇮", tz: "Europe/Ljubljana" },
    { name: "Solomon Islands", code: "SB", flag: "🇸🇧", tz: "Pacific/Guadalcanal" },
    { name: "Somalia", code: "SO", flag: "🇸🇴", tz: "Africa/Mogadishu" },
    { name: "South Africa", code: "ZA", flag: "🇿🇦", tz: "Africa/Johannesburg" },
    { name: "South Korea", code: "KR", flag: "🇰🇷", tz: "Asia/Seoul" },
    { name: "South Sudan", code: "SS", flag: "🇸🇸", tz: "Africa/Juba" },
    { name: "Spain", code: "ES", flag: "🇪🇸", tz: "Europe/Madrid" },
    { name: "Sri Lanka", code: "LK", flag: "🇱🇰", tz: "Asia/Colombo" },
    { name: "Sudan", code: "SD", flag: "🇸🇩", tz: "Africa/Khartoum" },
    { name: "Suriname", code: "SR", flag: "🇸🇷", tz: "America/Paramaribo" },
    { name: "Sweden", code: "SE2", flag: "🇸🇪", tz: "Europe/Stockholm" },
    { name: "Switzerland", code: "CH", flag: "🇨🇭", tz: "Europe/Zurich" },
    { name: "Syria", code: "SY", flag: "🇸🇾", tz: "Asia/Damascus" },
    { name: "Taiwan", code: "TW", flag: "🇹🇼", tz: "Asia/Taipei" },
    { name: "Tajikistan", code: "TJ", flag: "🇹🇯", tz: "Asia/Dushanbe" },
    { name: "Tanzania", code: "TZ", flag: "🇹🇿", tz: "Africa/Dar_es_Salaam" },
    { name: "Thailand", code: "TH", flag: "🇹🇭", tz: "Asia/Bangkok" },
    { name: "Timor-Leste", code: "TL", flag: "🇹🇱", tz: "Asia/Dili" },
    { name: "Togo", code: "TG", flag: "🇹🇬", tz: "Africa/Lome" },
    { name: "Tonga", code: "TO", flag: "🇹🇴", tz: "Pacific/Tongatapu" },
    { name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹", tz: "America/Port_of_Spain" },
    { name: "Tunisia", code: "TN", flag: "🇹🇳", tz: "Africa/Tunis" },
    { name: "Turkey", code: "TR", flag: "🇹🇷", tz: "Europe/Istanbul" },
    { name: "Turkmenistan", code: "TM", flag: "🇹🇲", tz: "Asia/Ashgabat" },
    { name: "Tuvalu", code: "TV", flag: "🇹🇻", tz: "Pacific/Funafuti" },
    { name: "Uganda", code: "UG", flag: "🇺🇬", tz: "Africa/Kampala" },
    { name: "Ukraine", code: "UA", flag: "🇺🇦", tz: "Europe/Kyiv" },
    { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", tz: "Asia/Dubai" },
    { name: "United Kingdom", code: "GB", flag: "🇬🇧", tz: "Europe/London" },
    { name: "United States", code: "US", flag: "🇺🇸", tz: "America/New_York" },
    { name: "Uruguay", code: "UY", flag: "🇺🇾", tz: "America/Montevideo" },
    { name: "Uzbekistan", code: "UZ", flag: "🇺🇿", tz: "Asia/Tashkent" },
    { name: "Vanuatu", code: "VU", flag: "🇻🇺", tz: "Pacific/Efate" },
    { name: "Vatican City", code: "VA", flag: "🇻🇦", tz: "Europe/Vatican" },
    { name: "Venezuela", code: "VE", flag: "🇻🇪", tz: "America/Caracas" },
    { name: "Vietnam", code: "VN", flag: "🇻🇳", tz: "Asia/Ho_Chi_Minh" },
    { name: "Yemen", code: "YE", flag: "🇾🇪", tz: "Asia/Aden" },
    { name: "Zambia", code: "ZM", flag: "🇿🇲", tz: "Africa/Lusaka" },
    { name: "Zimbabwe", code: "ZW", flag: "🇿🇼", tz: "Africa/Harare" }
  ];

  /* ---------- Platforms ---------- */
  var PLATFORMS = {
    tiktok: { name: "TikTok", icon: "T", cls: "p-tiktok", peak: [18, 22] },
    instagram: { name: "Instagram", icon: "IG", cls: "p-instagram", peak: [19, 21] },
    facebook: { name: "Facebook", icon: "f", cls: "p-facebook", peak: [12, 15] },
    youtube: { name: "YouTube", icon: "YT", cls: "p-youtube", peak: [19, 22] },
    shorts: { name: "YouTube Shorts", icon: "S", cls: "p-shorts", peak: [16, 20] }
  };

  /* ---------- Category adjustments (hour offsets + score mod) ---------- */
  var CATEGORIES = {
    Entertainment: { off: 0, mod: 4 },
    Education: { off: -1, mod: 2 },
    Technology: { off: 1, mod: 3 },
    Gaming: { off: 2, mod: 6 },
    Beauty: { off: 0, mod: 3 },
    Fitness: { off: -3, mod: 5 },
    Business: { off: -4, mod: 2 },
    Fashion: { off: 1, mod: 3 },
    Food: { off: 3, mod: 4 },
    ASMR: { off: 4, mod: 3 },
    Comedy: { off: 1, mod: 5 },
    Music: { off: 0, mod: 4 },
    Lifestyle: { off: 0, mod: 2 },
    Other: { off: 0, mod: 0 }
  };

  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /* ---------- Helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function fmtHour(h) { var ap = h >= 12 ? "PM" : "AM"; var hp = h % 12; if (hp === 0) hp = 12; return hp + ":00 " + ap; }
  function fmtWin(a, b) { return fmtHour(a) + " – " + fmtHour(b); }

  function tzNow(tz, base) {
    try {
      var d = base ? new Date(base.getTime()) : new Date();
      var s = d.toLocaleString("en-US", { timeZone: tz, hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
      var parts = s.match(/(\d{4})\/(\d{2})\/(\d{2}), (\d{2}):(\d{2}):(\d{2})/);
      if (!parts) return d;
      return new Date(parts[1], parts[2] - 1, parts[3], parts[4] === "24" ? 0 : parts[4], parts[5], parts[6]);
    } catch (e) { return new Date(); }
  }
  function tzAbbr(tz, date) {
    try {
      var s = (date || new Date()).toLocaleTimeString("en-US", { timeZone: tz, timeZoneName: "short" });
      var m = s.match(/([A-Z]{2,5})(\+|-)\d{2}:?\d{2}?$|([A-Z]{2,5})$/);
      if (m) return m[1] || m[3] || "";
      var parts = s.split(" ");
      return parts[parts.length - 1] || "";
    } catch (e) { return ""; }
  }

  /* ---------- Recommendation engine ---------- */
  // Returns { start, end, score, status } in LOCAL hours (0-23) for a given day index
  function windowFor(platform, category, dayIdx, seed) {
    var p = PLATFORMS[platform] || PLATFORMS.tiktok;
    var cat = CATEGORIES[category] || CATEGORIES.Other;
    var peak = p.peak;
    var h = Math.round((peak[0] + peak[1]) / 2) + cat.off;
    // weekend shift: Fri/Sat slightly later
    if (dayIdx === 5 || dayIdx === 6) h += 1;
    if (dayIdx === 0) h -= 1; // Sunday slightly earlier
    h = ((h % 24) + 24) % 24;

    // Deterministic jitter from seed
    var j = (seed % 5) - 2; // -2..+2
    var startH = clamp(h + j - 1, 6, 23);
    var endH = clamp(startH + 3, startH + 1, 24);

    // Score: base from proximity to peak + category mod + day boost + seed variance
    var dayBoost = (dayIdx === 5 || dayIdx === 6) ? 6 : (dayIdx === 3 ? 3 : 0);
    var base = 78 + dayBoost + cat.mod;
    var variance = (seed % 9) - 3;
    var score = clamp(base + variance, 55, 98);
    return { start: startH, end: endH, score: score };
  }

  function altWindows(platform, category, dayIdx, seed) {
    var p = PLATFORMS[platform] || PLATFORMS.tiktok;
    var cat = CATEGORIES[category] || CATEGORIES.Other;
    var peak = p.peak;
    var mid = Math.round((peak[0] + peak[1]) / 2) + cat.off;
    var opts = [mid - 4, mid + 4, mid + 6];
    var out = [];
    for (var i = 0; i < opts.length; i++) {
      var s = ((opts[i] % 24) + 24) % 24;
      if (s < 6) s += 12;
      var e = clamp(s + 2, s + 1, 24);
      var sc = clamp(70 + (seed % 7) - i * 5, 50, 88);
      out.push({ start: s, end: e, score: sc });
    }
    // dedupe by start
    var seen = {}; var res = [];
    out.forEach(function (w) { if (!seen[w.start]) { seen[w.start] = 1; res.push(w); } });
    return res.slice(0, 3);
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("vt-theme"); } catch (e) {}
    var theme = saved || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    var btn = $("#themeToggle");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.addEventListener("click", function () {
        var cur = document.documentElement.getAttribute("data-theme");
        var next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("vt-theme", next); } catch (e) {}
        btn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
      });
    }
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var btn = $("#menuBtn");
    var links = $("#navLinks");
    if (!btn || !links) return;
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $all("a", links).forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Live clock (hero preview) ---------- */
  function initClock() {
    var el = $("#liveClock");
    var tzEl = $("#liveTz");
    var actEl = $("#liveActivity");
    var scoreEl = $("#liveScore");
    var winEl = $("#liveWindow");
    var nextEl = $("#liveNext");
    if (!el) return;

    function tick() {
      var now = new Date();
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      var t = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
      var abbr = tzAbbr(tz, now) || "Local";
      el.textContent = t;
      tzEl.textContent = tz + " • " + abbr;

      var h = now.getHours();
      // simple activity curve: peak around 19-21
      var dist = Math.min(Math.abs(h - 20), Math.abs(h - 13), Math.abs(h - 8));
      var act = clamp(92 - dist * 7 + (h >= 18 && h <= 22 ? 8 : 0), 30, 96);
      if (actEl) actEl.textContent = act + "%";
      if (scoreEl) scoreEl.textContent = Math.round(act * 0.95) + "/100";

      // recommended window today
      var dayIdx = now.getDay();
      var seed = hashStr("tiktok|Nigeria|" + dayIdx) % 100;
      var w = windowFor("tiktok", "Entertainment", dayIdx, seed);
      if (winEl) winEl.textContent = fmtWin(w.start, w.end);

      // next best window
      var tomorrow = (dayIdx + 1) % 7;
      var seed2 = hashStr("tiktok|Nigeria|" + tomorrow) % 100;
      var w2 = windowFor("tiktok", "Entertainment", tomorrow, seed2);
      if (nextEl) nextEl.textContent = "Tomorrow • " + fmtWin(w2.start, w2.end);

      // post now indicator
      var pill = $("#livePill");
      if (pill) {
        if (h >= w.start && h < w.end) { pill.textContent = "POST NOW"; pill.className = "status-chip status-now"; }
        else { pill.textContent = "WAIT"; pill.className = "status-chip status-wait"; }
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Country combobox ---------- */
  function initCombo() {
    var wrap = $("#countryCombo");
    if (!wrap) return;
    var input = $(".combo-input", wrap);
    var list = $(".combo-list", wrap);
    var flagEl = $(".combo-flag", wrap);
    var hidden = $("#countryValue");
    var activeIndex = -1;
    var filtered = COUNTRIES.slice();

    function render() {
      list.innerHTML = "";
      if (filtered.length === 0) {
        var e = document.createElement("div");
        e.className = "combo-empty";
        e.textContent = "No countries found";
        list.appendChild(e);
        return;
      }
      filtered.forEach(function (c, i) {
        var opt = document.createElement("div");
        opt.className = "combo-opt" + (i === activeIndex ? " active" : "");
        opt.setAttribute("role", "option");
        opt.innerHTML = '<span class="flag">' + c.flag + '</span><span class="name">' + escapeHtml(c.name) + '</span><span class="tz">' + c.tz + '</span>';
        opt.addEventListener("mousedown", function (ev) { ev.preventDefault(); select(c); });
        list.appendChild(opt);
      });
    }

    function select(c) {
      input.value = c.name;
      flagEl.textContent = c.flag;
      input.classList.add("has-flag");
      hidden.value = c.code;
      list.classList.add("hidden");
      activeIndex = -1;
      // update tz hint
      var tzHint = $("#countryTzHint");
      if (tzHint) tzHint.textContent = c.tz + " • " + tzAbbr(c.tz, new Date());
    }

    function filter(q) {
      q = q.toLowerCase().trim();
      filtered = COUNTRIES.filter(function (c) { return c.name.toLowerCase().indexOf(q) !== -1 || c.code.toLowerCase().indexOf(q) !== -1; });
      activeIndex = filtered.length ? 0 : -1;
      render();
    }

    input.addEventListener("focus", function () { filter(input.value); list.classList.remove("hidden"); });
    input.addEventListener("input", function () { filter(input.value); list.classList.remove("hidden"); });
    input.addEventListener("keydown", function (ev) {
      if (list.classList.contains("hidden")) return;
      if (ev.key === "ArrowDown") { ev.preventDefault(); activeIndex = Math.min(activeIndex + 1, filtered.length - 1); render(); }
      else if (ev.key === "ArrowUp") { ev.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); render(); }
      else if (ev.key === "Enter") { ev.preventDefault(); if (filtered[activeIndex]) select(filtered[activeIndex]); }
      else if (ev.key === "Escape") { list.classList.add("hidden"); }
    });

    document.addEventListener("click", function (ev) {
      if (!wrap.contains(ev.target)) list.classList.add("hidden");
    });

    // default: Nigeria (matches the spec example)
    var def = COUNTRIES.find(function (c) { return c.code === "NG"; });
    if (def) select(def);
  }

  function escapeHtml(s) { return s.replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- Result rendering ---------- */
  var lastResult = null;

  function getFormData() {
    return {
      username: ($("#username") && $("#username").value || "").trim(),
      platform: ($("#platform") && $("#platform").value || "tiktok"),
      country: ($("#countryValue") && $("#countryValue").value || "NG"),
      category: ($("#category") && $("#category").value || "Entertainment"),
      day: ($("#day") && $("#day").value || "today")
    };
  }

  function countryByCode(code) { return COUNTRIES.find(function (c) { return c.code === code; }) || COUNTRIES.find(function (c) { return c.code === "NG"; }); }

  function computeResult(form) {
    var country = countryByCode(form.country);
    var tz = country.tz;
    var now = tzNow(tz);
    var dayIdx = now.getDay();
    var label = "Today";
    if (form.day === "tomorrow") { dayIdx = (dayIdx + 1) % 7; label = "Tomorrow"; now = new Date(now.getTime() + 86400000); }
    if (form.day === "weekly") label = "This Week";

    var seedBase = hashStr(form.platform + "|" + country.code + "|" + form.category);
    var primary = windowFor(form.platform, form.category, dayIdx, seedBase % 100);
    var alts = altWindows(form.platform, form.category, dayIdx, (seedBase + 7) % 100);

    // post-now check (only meaningful for "today")
    var currentH = (new Date()).getHours();
    var inWindow = (form.day === "today") && (currentH >= primary.start && currentH < primary.end);

    // time until window
    var minsUntil = null;
    if (!inWindow && form.day === "today") {
      var target = new Date();
      target.setHours(primary.start, 0, 0, 0);
      if (target.getTime() < Date.now()) target.setTime(target.getTime() + 86400000);
      minsUntil = Math.round((target.getTime() - Date.now()) / 60000);
    }

    // weekly
    var week = [];
    for (var i = 0; i < 7; i++) {
      var d = (now.getDay() + i) % 7;
      var w = windowFor(form.platform, form.category, d, (seedBase + i * 13) % 100);
      week.push({ dayIdx: d, day: DAYS[d], start: w.start, end: w.end, score: w.score, isToday: i === 0 });
    }

    return {
      form: form, country: country, tz: tz, label: label,
      primary: primary, alts: alts, inWindow: inWindow, minsUntil: minsUntil,
      week: week, now: now, dayIdx: dayIdx
    };
  }

  function renderResult(r) {
    var res = $("#results");
    if (!res) return;
    res.classList.remove("hidden");
    var p = PLATFORMS[r.form.platform];
    var best = fmtWin(r.primary.start, r.primary.end);
    var score = r.primary.score;

    var statusHtml = r.inWindow
      ? '<span class="status-chip status-now"><span style="width:8px;height:8px;border-radius:50%;background:var(--success);display:inline-block"></span> POST NOW — Audience activity is high</span>'
      : '<span class="status-chip status-wait"><span style="width:8px;height:8px;border-radius:50%;background:var(--warning);display:inline-block"></span> WAIT FOR THE NEXT BEST WINDOW' + (r.minsUntil != null ? " · in " + humanDur(r.minsUntil) : "") + '</span>';

    var altsHtml = r.alts.map(function (a) {
      return '<div class="alt-item"><span class="t">' + fmtWin(a.start, a.end) + '</span><span class="s">Score ' + a.score + '/100</span></div>';
    }).join("");

    var shareText = "My best posting time is " + best + " (" + p.name + ", " + r.country.name + ") according to ViralTime AI. " + window.location.href;
    lastResult = { shareText: shareText, best: best, platform: p.name, country: r.country };

    var html = '' +
      '<div class="result-card">' +
        '<div class="result-top">' +
          '<div class="result-platform"><span class="pico ' + p.cls + '" style="color:#fff;font-weight:800;font-size:0.8rem">' + p.icon + '</span>' + p.name + ' • ' + r.country.name + ' ' + r.country.flag + '</div>' +
          statusHtml +
        '</div>' +
        '<div class="result-grid">' +
          '<div class="stat"><div class="k">Best Time ' + r.label + '</div><div class="v mono">' + best + '</div><div class="sub">' + r.tz + '</div></div>' +
          '<div class="stat"><div class="k">Next Best Window</div><div class="v mono">' + nextBestLabel(r) + '</div><div class="sub">' + nextBestSub(r) + '</div></div>' +
          '<div class="stat score-block">' +
            '<div class="k">AI Engagement Score</div>' +
            '<div class="score-row"><span class="score-num">' + score + '</span><span class="score-max">/ 100</span></div>' +
            '<div class="meter"><i style="width:' + score + '%"></i></div>' +
            '<div class="sub" style="margin-top:8px">Estimated audience activity: ' + score + '%</div>' +
          '</div>' +
          '<div class="stat"><div class="k">Local Time Now</div><div class="v mono" id="resLocalTime">' + r.now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) + '</div><div class="sub" id="resTzAbbr">' + r.tz + ' • ' + tzAbbr(r.tz, r.now) + '</div></div>' +
        '</div>' +
        '<div class="alt-windows">' +
          '<h4>Additional recommended windows</h4>' +
          '<div class="alt-list">' + altsHtml + '</div>' +
        '</div>' +
        '<div class="disclaimer"><span aria-hidden="true">⚠️</span><span>Estimated audience activity based on general patterns. Viral performance is not guaranteed and depends on content quality, audience, platform algorithm, and competition.</span></div>' +
        '<div class="share-row">' +
          '<button class="share-btn" id="copyBtn" type="button"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Result</button>' +
          '<a class="share-btn" id="waShare" target="_blank" rel="noopener" href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A8 8 0 1 1 12 20zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.2-.5s0-.4 0-.5-.6-1.4-.8-2c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg> WhatsApp</a>' +
          '<a class="share-btn" id="fbShare" target="_blank" rel="noopener" href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg> Facebook</a>' +
          '<a class="share-btn" id="xShare" target="_blank" rel="noopener" href="#"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5-6.6L5.6 22H2.5l8-9.2L1.5 2h6.9l4.6 6.1L18.9 2zm-1.2 18h1.9L7.1 4H5.1l12.6 16z"/></svg> X</a>' +
          '<button class="share-btn" id="nativeShare" type="button" style="display:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg> Share</button>' +
        '</div>' +
      '</div>';

    // Build tabs container
    res.innerHTML = '<div class="tabs" role="tablist" aria-label="Result period">' +
      '<button class="tab active" data-tab="today" role="tab">Today</button>' +
      '<button class="tab" data-tab="tomorrow" role="tab">Tomorrow</button>' +
      '<button class="tab" data-tab="weekly" role="tab">This Week</button>' +
    '</div>' +
    '<div id="resultBody">' + html + '</div>';

    attachResultEvents(r);
    renderTab(r, "today");
    res.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function nextBestLabel(r) {
    if (r.form.day === "tomorrow") {
      // show today's
      var todayIdx = (r.dayIdx + 6) % 7;
      var seed = hashStr(r.form.platform + "|" + r.country.code + "|" + r.form.category) % 100;
      var w = windowFor(r.form.platform, r.form.category, todayIdx, seed);
      return fmtWin(w.start, w.end);
    }
    // tomorrow's window
    var tomIdx = (r.dayIdx + 1) % 7;
    var seed2 = (hashStr(r.form.platform + "|" + r.country.code + "|" + r.form.category) + 7) % 100;
    var w2 = windowFor(r.form.platform, r.form.category, tomIdx, seed2);
    return fmtWin(w2.start, w2.end);
  }
  function nextBestSub(r) {
    if (r.form.day === "tomorrow") return "Yesterday's window";
    var tomIdx = (r.dayIdx + 1) % 7;
    return "Tomorrow • " + DAYS[tomIdx];
  }

  function humanDur(mins) {
    if (mins < 60) return mins + " min";
    var h = Math.floor(mins / 60); var m = mins % 60;
    return h + "h " + (m ? m + "m" : "");
  }

  function renderTab(r, tab) {
    if (tab === "weekly") { renderWeekly(r); return; }
    var form = { username: r.form.username, platform: r.form.platform, country: r.form.country, category: r.form.category, day: tab };
    var nr = computeResult(form);
    var p = PLATFORMS[nr.form.platform];
    var best = fmtWin(nr.primary.start, nr.primary.end);
    var score = nr.primary.score;
    var statusHtml = (tab === "today" && nr.inWindow)
      ? '<span class="status-chip status-now"><span style="width:8px;height:8px;border-radius:50%;background:var(--success);display:inline-block"></span> POST NOW — Audience activity is high</span>'
      : '<span class="status-chip status-wait"><span style="width:8px;height:8px;border-radius:50%;background:var(--warning);display:inline-block"></span> WAIT FOR THE NEXT BEST WINDOW' + (tab === "today" && nr.minsUntil != null ? " · in " + humanDur(nr.minsUntil) : "") + '</span>';

    var altsHtml = nr.alts.map(function (a) {
      return '<div class="alt-item"><span class="t">' + fmtWin(a.start, a.end) + '</span><span class="s">Score ' + a.score + '/100</span></div>';
    }).join("");

    var body = $("#resultBody");
    body.innerHTML = '' +
      '<div class="result-card">' +
        '<div class="result-top">' +
          '<div class="result-platform"><span class="pico ' + p.cls + '" style="color:#fff;font-weight:800;font-size:0.8rem">' + p.icon + '</span>' + p.name + ' • ' + nr.country.name + ' ' + nr.country.flag + '</div>' +
          statusHtml +
        '</div>' +
        '<div class="result-grid">' +
          '<div class="stat"><div class="k">Best Time ' + nr.label + '</div><div class="v mono">' + best + '</div><div class="sub">' + nr.tz + '</div></div>' +
          '<div class="stat"><div class="k">Next Best Window</div><div class="v mono">' + nextBestLabel(nr) + '</div><div class="sub">' + nextBestSub(nr) + '</div></div>' +
          '<div class="stat score-block">' +
            '<div class="k">AI Engagement Score</div>' +
            '<div class="score-row"><span class="score-num">' + score + '</span><span class="score-max">/ 100</span></div>' +
            '<div class="meter"><i style="width:' + score + '%"></i></div>' +
            '<div class="sub" style="margin-top:8px">Estimated audience activity: ' + score + '%</div>' +
          '</div>' +
          '<div class="stat"><div class="k">Local Time Now</div><div class="v mono">' + nr.now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) + '</div><div class="sub">' + nr.tz + ' • ' + tzAbbr(nr.tz, nr.now) + '</div></div>' +
        '</div>' +
        '<div class="alt-windows"><h4>Additional recommended windows</h4><div class="alt-list">' + altsHtml + '</div></div>' +
        '<div class="disclaimer"><span aria-hidden="true">⚠️</span><span>Estimated audience activity based on general patterns. Viral performance is not guaranteed and depends on content quality, audience, platform algorithm, and competition.</span></div>' +
      '</div>';
    attachResultEvents(nr);
  }

  function renderWeekly(r) {
    var p = PLATFORMS[r.form.platform];
    var rows = r.week.map(function (d) {
      return '<tr class="' + (d.isToday ? "today-row" : "") + '">' +
        '<td class="day">' + d.day + (d.isToday ? ' <span style="color:var(--primary);font-size:0.72rem;font-weight:700">(TODAY)</span>' : '') + '</td>' +
        '<td class="time">' + fmtWin(d.start, d.end) + '</td>' +
        '<td><div class="bar-cell"><span class="bar-track"><i class="bar-fill" style="width:' + d.score + '%"></i></span><span class="bar-num">' + d.score + '</span></div></td>' +
      '</tr>';
    }).join("");

    var body = $("#resultBody");
    body.innerHTML = '' +
      '<div class="result-card">' +
        '<div class="result-top">' +
          '<div class="result-platform"><span class="pico ' + p.cls + '" style="color:#fff;font-weight:800;font-size:0.8rem">' + p.icon + '</span>' + p.name + ' • ' + r.country.name + ' ' + r.country.flag + '</div>' +
          '<span class="status-chip status-wait" style="color:var(--primary);background:var(--grad-soft);border-color:var(--border-soft)">7-Day Outlook</span>' +
        '</div>' +
        '<div style="overflow-x:auto">' +
        '<table class="week-table"><thead><tr><th>Day</th><th>Recommended Time</th><th>Activity Score</th></tr></thead><tbody>' + rows + '</tbody></table>' +
        '</div>' +
        '<div class="disclaimer"><span aria-hidden="true">⚠️</span><span>Weekly estimates are based on general audience activity patterns. Actual performance varies with content and platform algorithm.</span></div>' +
      '</div>';
  }

  function attachResultEvents(r) {
    var copyBtn = $("#copyBtn");
    if (copyBtn && lastResult) {
      copyBtn.addEventListener("click", function () {
        var text = lastResult.shareText;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { flashCopied(copyBtn); }).catch(function () { fallbackCopy(text); flashCopied(copyBtn); });
        } else { fallbackCopy(text); flashCopied(copyBtn); }
      });
    }
    var wa = $("#waShare"); if (wa && lastResult) wa.href = "https://wa.me/?text=" + encodeURIComponent(lastResult.shareText);
    var fb = $("#fbShare"); if (fb && lastResult) fb.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(location.href) + "&quote=" + encodeURIComponent(lastResult.shareText);
    var x = $("#xShare"); if (x && lastResult) x.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(lastResult.shareText);
    var ns = $("#nativeShare");
    if (ns) {
      if (navigator.share) { ns.style.display = "inline-flex"; ns.addEventListener("click", function () {
        if (lastResult) navigator.share({ title: "ViralTime AI", text: lastResult.shareText, url: location.href }).catch(function () {});
      }); }
    }
  }

  function flashCopied(btn) {
    var orig = btn.innerHTML;
    btn.classList.add("copied");
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
    showToast("Result copied to clipboard");
    setTimeout(function () { btn.classList.remove("copied"); btn.innerHTML = orig; }, 1800);
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  function showToast(msg) {
    var t = $("#toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._tid);
    t._tid = setTimeout(function () { t.classList.remove("show"); }, 2400);
  }

  /* ---------- Form submit ---------- */
  function initForm() {
    var form = $("#checkerForm");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = getFormData();
      var r = computeResult(data);
      renderResult(r);
    });

    // tabs
    document.addEventListener("click", function (ev) {
      var tab = ev.target.closest(".tab");
      if (!tab || !tab.dataset.tab) return;
      var tabs = $all(".tab");
      tabs.forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active"); tab.setAttribute("aria-selected", "true");
      var form = getFormData();
      form.day = tab.dataset.tab;
      var r = computeResult(form);
      if (tab.dataset.tab === "weekly") renderWeekly(r);
      else renderTab(r, tab.dataset.tab);
    });
  }

  /* ---------- Platform cards (scroll to checker + preselect) ---------- */
  function initPlatformCards() {
    $all("[data-set-platform]").forEach(function (card) {
      card.addEventListener("click", function () {
        var p = card.getAttribute("data-set-platform");
        var sel = $("#platform");
        if (sel && p) sel.value = p;
        var checker = $("#checker");
        if (checker) checker.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  /* ---------- Smooth scroll for hash links ---------- */
  function initSmoothLinks() {
    $all('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (ev) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (target) { ev.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $all(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Contact form ---------- */
  function initContact() {
    var form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var ok = $("#contactSuccess");
      if (ok) ok.classList.add("show");
      form.reset();
      setTimeout(function () { if (ok) ok.classList.remove("show"); }, 5000);
    });
  }

  /* ---------- Active nav link ---------- */
  function initActiveNav() {
    var path = location.pathname.split("/").pop() || "index.html";
    $all(".nav-links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path || (path === "index.html" && href === "index.html") || (path === "" && href === "index.html")) {
        a.classList.add("active");
      }
    });
  }

  /* ---------- Init ---------- */
  function init() {
    initTheme();
    initMenu();
    initActiveNav();
    initClock();
    initCombo();
    initForm();
    initPlatformCards();
    initSmoothLinks();
    initReveal();
    initContact();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
