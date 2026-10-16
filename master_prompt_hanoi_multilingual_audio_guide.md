# ROLE & OBJECTIVE
Bạn là một **Principal Frontend Architect & Senior UI/UX Engineer** chuyên sâu về hệ sinh thái **React.js (Web)** và **React Native (Mobile)**, có tư duy thiết kế Pixel-Perfect và kiến trúc hệ thống chuẩn CI/CD.

Nhiệm vụ của bạn là xây dựng hoàn chỉnh ứng dụng Web **“Hanoi Audio Guide – Hệ thống Thuyết minh Tự động Đa ngôn ngữ cho Di sản & Danh thắng Hà Nội”** dựa trên tài liệu PRD và tái tạo **giống hệt 100% bố cục, tỷ lệ kích thước (ở mức zoom 100%), màu sắc, đổ bóng, bo góc và typography** của 4 ảnh thiết kế trong thư mục `samplepic/` (`explore`, `location`, `map`, `favorite`), đồng thời thiết kế thêm trang **About us** và **Footer** đồng bộ hoàn hảo với phong cách tối giản, sang trọng (Clean Minimalist Editorial UI) của bộ ảnh mẫu.

---

# 🚨 QUY TẮC TỐI THƯỢNG (STRICT RULES - TUYỆT ĐỐI TUÂN THỦ)

1. **TUYỆT ĐỐI KHÔNG NHÚNG ẢNH TRONG `samplepic/` MỘT CÁCH LƯỜI BIẾNG:**
   - Các file ảnh trong thư mục `samplepic/` (`explore.png`/`explore.jpg`, `location.png`/`location.jpg`, `map.png`, `favorite.png`/`favorite.jpg`) **CHỈ DÙNG ĐỂ QUAN SÁT (VISION REFERENCE)** nhằm lấy cấu trúc layout, khoảng cách và style.
   - **NGHIÊM CẤM** dùng thẻ `<img>` hay CSS `background-image` trỏ tới các ảnh trong `samplepic/` để hiển thị giả làm giao diện. Toàn bộ giao diện phải được code chi tiết bằng JSX (`header`, `nav`, `main`, `section`, `aside`, `footer`, `div`, `button`, `input`...) và Tailwind CSS.

2. **CHUẨN KÍCH THƯỚC 100% VIEWPORT (KHÔNG SAI TỶ LỆ):**
   - Giao diện phải hiển thị cân đối, sắc nét ngay ở mức **trình duyệt 100% zoom** (Container chính `max-w-6xl` hoặc `max-w-7xl mx-auto px-6`, font chữ Inter/Plus Jakarta Sans gọn gàng, card và nút bấm đúng tỷ lệ thực tế).
   - Không được làm chữ hoặc khung quá to khiến người dùng phải thu nhỏ trình duyệt mới nhìn hết bố cục.

3. **TỰ ĐỘNG LÊN MẠNG TẢI ẢNH ĐỊA DANH HÀ NỘI & SVG VỀ THƯ MỤC DỰ ÁN:**
   - Bạn được cấp toàn quyền chạy lệnh Terminal (`curl`, `wget` hoặc viết script Node.js `scripts/download-assets.mjs`) để **tự động tải hình ảnh chất lượng cao từ Internet** (Wikimedia Commons / Unsplash) của các di sản Hà Nội (Hồ Hoàn Kiếm & Đền Ngọc Sơn, Văn Miếu - Quốc Tử Giám, Hoàng Thành Thăng Long, Chùa Một Cột, Lăng Chủ tịch Hồ Chí Minh, Nhà Thờ Lớn Hà Nội, Khu Phố Cổ Hà Nội, Chùa Trấn Quốc, Nhà Hát Lớn Hà Nội) và các file SVG icon cần thiết.
   - Lưu toàn bộ tài nguyên đã tải vào đúng các thư mục `public/assets/images/landmarks/` và `src/assets/icons/` đã thiết kế trước đó. Kiểm tra kỹ dung lượng file tải về để đảm bảo không có bất kỳ ảnh nào bị lỗi (broken image).

4. **ĐẦY ĐỦ HIỆU ỨNG (HOVER, TRANSITION, MICRO-INTERACTIONS) & HOẠT ĐỘNG THỰC TẾ:**
   - Đầy đủ hiệu ứng tinh tế: Card nổi nhẹ khi hover (`hover:-translate-y-1 hover:shadow-lg transition-all duration-300`), ảnh zoom mượt (`group-hover:scale-105`), nút thả tim có hiệu ứng nhịp đập (`active:scale-125`), thanh tiến trình audio kéo thả mượt mà, chuyển tab có hiệu ứng fade-in.
   - Các chức năng hoạt động đầy đủ ở phía Client (không cần Backend): Tìm kiếm, lọc theo quận/danh mục, phát thuyết minh đa ngôn ngữ (kết hợp Audio thực tế & Web Speech API), tua thời gian, chỉnh tốc độ đọc (`1x`, `1.25x`, `1.5x`, `2x`), điều chỉnh âm lượng, thả tim lưu vào `localStorage`, tự động cộng số lượng **"Audio Listened"** khi người dùng bấm nghe và hiển thị thống kê chính xác.

---

# 🏗️ PHẦN 1: THIẾT KẾ CẤU TRÚC FOLDER & FILE (CHUẨN REACT.JS + SẴN SÀNG CHO REACT NATIVE & CI/CD)

Hãy thiết kế cây thư mục dự án theo kiến trúc phân tách rõ tầng `core/` (dùng chung cho Web React.js hiện tại và Mobile React Native trong tương lai) cùng cấu hình CI/CD:

```text
hanoi-audio-guide/
├── .github/
│   └── workflows/
│       └── ci-cd.yml                   # Pipeline CI/CD mẫu (Lint, Build, Test, Deploy) sẵn sàng cho tương lai
├── mobile-react-native-blueprint/      # Kiến trúc định hướng sẵn cho ứng dụng React Native (Mobile) tương lai
│   └── ARCHITECTURE.md                 # Tài liệu hướng dẫn tái sử dụng thư mục src/core/ cho React Native
├── samplepic/                          # THƯ MỤC ẢNH MẪU (CHỈ QUAN SÁT BỐ CỤC, CẤM IMPORT VÀO CODE)
│   ├── explore.png (hoặc .jpg)
│   ├── location.png (hoặc .jpg)
│   ├── map.png
│   └── favorite.png (hoặc .jpg)
├── scripts/
│   └── download-assets.mjs             # Script tự động tải ảnh di sản Hà Nội & SVG từ mạng về thư mục local
├── public/
│   └── assets/
│       ├── images/
│       │   ├── landmarks/              # Ảnh chất lượng cao của các di tích Hà Nội tải từ Internet
│       │   └── banners/                # Ảnh banner cho trang About Us & Hero
│       └── audio/                      # File audio mẫu (.mp3)
├── src/
│   ├── assets/
│   │   └── icons/                      # Các file SVG icon (Heart, Play, Pause, MapPin, Calendar, Clock, Globe, Volume...)
│   ├── core/                           # TẦNG LOGIC ĐỘC LẬP (DÙNG CHUNG CHO WEB REACT.JS & MOBILE REACT NATIVE)
│   │   ├── data/
│   │   │   ├── hanoiHeritageSites.js   # Database toàn bộ POIs Hà Nội đa ngôn ngữ (VI, EN, FR, JA, KO, ZH)
│   │   │   └── uiTranslations.js       # Từ điển đa ngôn ngữ cho toàn bộ giao diện
│   │   ├── context/
│   │   │   ├── HeritageContext.jsx     # Quản lý: Ngôn ngữ, Danh sách Saved Sites (Tim), Số lượng Audio Listened
│   │   │   └── AudioPlayerContext.jsx  # Quản lý: Trình phát Audio toàn cục, thanh Bottom Player, tốc độ đọc, âm lượng
│   │   └── hooks/
│   │       ├── useLocalStorage.js      # Lưu bền vững trạng thái Tim & Thống kê nghe vào trình duyệt
│   │       └── useGeolocation.js       # Định vị GPS người dùng & tự động gợi ý thuyết minh gần nhất
│   ├── components/
│   │   ├── layout/
│   │   │   ├── HeaderNavbar.jsx        # Thanh điều hướng chuẩn theo samplepic (Logo / Nút Back All Sites, Menu giữa, User & Language góc phải)
│   │   │   ├── StickyBottomPlayer.jsx  # Thanh trình phát âm thanh cố định dưới đáy màn hình (giống hệt ảnh location)
│   │   │   ├── Footer.jsx              # Footer chuyên nghiệp, đồng bộ tông màu trắng - đen - xám tinh tế
│   │   │   └── MainLayout.jsx          # Bọc cấu trúc trang + hiệu ứng chuyển trang
│   │   └── cards/
│   │       ├── ExploreSiteCard.jsx     # Card địa điểm ở trang Explore (3 cột)
│   │       ├── FavoriteSiteCard.jsx    # Card địa điểm ở trang Favorites (4 cột, nút tim nổi góc phải dưới ảnh)
│   │       └── MapLocationItem.jsx     # Card địa điểm ngang ở cột trái trang Map
│   ├── pages/
│   │   ├── ExplorePage.jsx             # Trang chính (Route: /) - Thiết kế giống hệt samplepic/explore
│   │   ├── LocationDetailPage.jsx      # Trang chi tiết (Route: /location/:id) - Thiết kế giống hệt samplepic/location
│   │   ├── MapPage.jsx                 # Trang bản đồ (Route: /map) - Thiết kế giống hệt samplepic/map
│   │   ├── FavoritesPage.jsx           # Trang yêu thích (Route: /favorites) - Thiết kế giống hệt samplepic/favorite
│   │   └── AboutUsPage.jsx             # Trang về chúng tôi (Route: /about) - Thiết kế đồng bộ phong cách
│   ├── routes/
│   │   └── AppRouter.jsx               # Cấu hình React Router DOM đầy đủ
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

---

# 🎨 PHẦN 2: ĐẶC TẢ CHI TIẾT GIAO DIỆN TỪNG TRANG (CHUẨN PIXEL-PERFECT THEO 4 ẢNH `samplepic/`)

Hệ thống sử dụng phong cách thiết kế **Clean White & Charcoal Editorial UI**:
- **Màu nền chính:** Trắng tinh khiết (`#FFFFFF`) kết hợp các vùng xám nhạt (`#F8F9FA`, `#F3F4F6`).
- **Màu nhấn (Primary Accent):** Đen than (`#111827` / `#000000`) cho các nút Active pill, nút Play chính và thanh âm lượng.
- **Màu trạng thái:** Đỏ tươi (`#EF4444`) trên nền hồng phấn (`#FEF2F2`) cho nút Tim / Saved Sites; Xanh lá nhạt (`#ECFDF5` với chữ `#059669`) cho nhãn danh mục ở trang Map.

---

## 1. Thanh Điều Hướng Trên Cùng (`HeaderNavbar.jsx`)
- **Chiều cao & Bố cục:** Nền trắng (`bg-white`), căn giữa theo trục ngang với 3 khu vực:
  - **Bên trái:**
    - Ở trang Chủ (`/`): Hiển thị Logo thương hiệu phong cách tối giản, đậm nét (ví dụ: `HANOI HERITAGE` / `THĂNG LONG AUDIO` thiết kế kiểu chữ khung vuông giống logo mẫu).
    - Ở các trang khác (`/location/:id`, `/map`, `/favorites`, `/about`): Tự động chuyển thành nút điều hướng **`← All Sites`** (mũi tên trái + chữ đậm vừa, bấm vào quay về `/`).
  - **Ở giữa:** 4 liên kết điều hướng ngang cách đều nhau (`gap-8`): **`Explore`**, **`Map`**, **`Favorites`**, **`About us`**. Có hiệu ứng gạch chân hoặc đậm lên khi đang ở route tương ứng.
  - **Bên phải:**
    - Nút chọn **Đa ngôn ngữ** (biểu tượng quả địa cầu/cờ tròn gọn gàng cho phép đổi nhanh Tiếng Việt, English, Français, 日本語, 한국어 theo đúng yêu cầu PRD).
    - Nút tròn **User Profile** (`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`) chứa icon hình người màu đen giống hệt góc phải trên của cả 4 ảnh mẫu.

---

## 2. Trang Chủ Khám Phá – `ExplorePage.jsx` (Route: `/`) -> Giống hệt `explore.jpg` / `explore.png`
1. **Khu vực Hero Banner (Nền chuyển sắc xám bạc nhẹ sang trắng):**
   - Nền gradient mềm mại (`bg-gradient-to-b from-gray-200/80 via-gray-100/60 to-white py-14 px-4 text-center`).
   - Tiêu đề chính cỡ lớn, in đậm: **"Heritage Sites of Hanoi"** (hoặc dịch tự động theo ngôn ngữ đang chọn: *"Di sản Văn hóa Hà Nội"*).
   - Phụ đề màu xám bên dưới: *"Explore Hanoi's magnificent cultural and historical treasures through immersive audio guides"*.
   - Dòng thông tin nhỏ có icon MapPin: `📍 6 Heritage Sites in Hanoi` (hoặc tổng số địa điểm hiện có).
   - **Thanh tìm kiếm (Search Bar):** Khung trắng bo tròn (`max-w-xl mx-auto rounded-xl bg-white shadow-sm border border-gray-200 px-4 py-3`), có icon kính lúp bên trái và placeholder `"Search sites by name, location, or description..."`.
   - **Dải nút lọc Quận / Khu vực (Filter Pills):** Nằm ngay dưới thanh tìm kiếm, gồm các nút bo tròn (`rounded-full px-4 py-1.5 text-xs font-medium`):
     - Nút đang chọn (Active): Nền đen chữ trắng (`bg-black text-white`), mặc định là **`All Districts`** (tương ứng `All States` trong ảnh mẫu).
     - Các nút còn lại: Nền trắng/xám nhạt viền mảnh (`bg-white/80 border border-gray-300 text-gray-700 hover:border-black`), gồm: `Hoan Kiem`, `Ba Dinh`, `Dong Da`, `Tay Ho`, `Old Quarter`.
2. **Khu vực Danh sách Địa điểm (3-Column Card Grid):**
   - Phía trên bên trái lưới hiển thị dòng chữ nhỏ màu xám: `Showing 6 of 6 sites`.
   - **Lưới 3 cột (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`):**
   - **Cấu trúc từng Card (`rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-gray-900 hover:shadow-md cursor-pointer`):**
     - **Phần ảnh trên (`relative h-56 w-full overflow-hidden`):** Ảnh địa danh Hà Nội sắc nét. Góc trên bên phải của ảnh có nhãn phân loại màu trắng bo tròn (`bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm`), ví dụ: `Cultural`, `Historical`, `Architectural`, `Spiritual`.
     - **Phần nội dung dưới (`p-5`):**
       - Tiêu đề địa danh in đậm (`text-base font-bold text-gray-900`), ví dụ: *Hoan Kiem Lake & Ngoc Son Temple*, *Imperial Citadel of Thang Long*, *Temple of Literature*, *One Pillar Pagoda*, *Ho Chi Minh Mausoleum*, *Hanoi Old Quarter*.
       - Dòng metadata (`flex items-center gap-4 text-xs text-gray-500 mt-1.5`): `📍 Hoan Kiem` và `📅 1010` (năm xây dựng/công nhận di sản).
       - Đoạn mô tả ngắn giới hạn 2 dòng (`text-xs text-gray-600 line-clamp-2 mt-2.5 leading-relaxed`).
       - Dòng chân card (`mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500`): Bên trái có icon đồng hồ `🕒 Audio guide: 7 min`, bên phải có thể bấm nhanh để nghe hoặc thả tim. Khi click vào Card sẽ chuyển sang trang `/location/:id`.

---

## 3. Trang Chi Tiết Địa Điểm & Phát Audio – `LocationDetailPage.jsx` (Route: `/location/:id`) -> Giống hệt `location.jpg` / `location.png`
1. **Hero Banner Toàn Chiều Rộng Có Hiệu Ứng Mờ Dần Xuống Trắng (Fade-to-White Gradient):**
   - Chiều cao khoảng `360px - 420px`, hiển thị ảnh chất lượng cao của địa điểm Hà Nội đang xem.
   - Phủ lớp gradient trắng mờ dần ở phía dưới (`bg-gradient-to-t from-white via-white/50 to-transparent`).
   - Nội dung đặt ở góc dưới bên trái (căn thẳng hàng với container bên dưới):
     - Nhãn đen chữ trắng bo tròn (`bg-black text-white text-xs font-semibold px-3 py-1 rounded-full`): ví dụ `Cultural`.
     - Tiêu đề địa điểm cỡ rất lớn, đậm (`text-4xl font-extrabold text-gray-900 mt-2`).
     - Hàng 3 pill trắng có viền mảnh (`flex items-center gap-2.5 mt-3`):
       1. `[📍 Hoan Kiem, Hanoi]` (`bg-white/90 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium`)
       2. `[📅 Heritage Site since 1010]` (`bg-white/90 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium`)
       3. **Nút Thả Tim (`[ ♡ ]`):** Nút vuông bo góc nền trắng (`bg-white border border-gray-200 rounded-lg p-2 hover:bg-red-50`), khi đã tim thì đổi sang trái tim đỏ `#EF4444`.
2. **Bố Cục Nội Dung Chính Chia 2 Cột (`grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto mt-6 pb-28`):**
   - **CỘT TRÁI (Chiếm 8/12 cột – Gồm 3 khung Card xếp dọc `space-y-6`):**
     1. **Khung 1: `Audio Guide` Player Card (`bg-white border border-gray-200 rounded-2xl p-6 shadow-xs`):**
        - **Hàng tiêu đề:** Bên trái là chữ đậm **`Audio Guide`** kèm badge xám nhạt `6:00 total`. Bên phải là icon quả địa cầu `🌐` + **Dropdown chọn ngôn ngữ thuyết minh** (`Vietnamese ⌄`, `English ⌄`, `French ⌄`, `Japanese ⌄`, `Korean ⌄`).
        - **Đoạn lời thoại thuyết minh (Transcript Preview):** 2–3 dòng chữ xám (`text-xs text-gray-600 mt-3 leading-relaxed`) hiển thị nội dung thuyết minh bằng đúng ngôn ngữ đã chọn.
        - **Thanh tiến trình (Progress Seek Bar):** Thanh trượt ngang màu xám nhạt có nút tròn trắng viền xám (`w-4 h-4 rounded-full bg-white border-2 border-gray-400`), bên dưới hiển thị thời gian bắt đầu `0:00` (trái) và tổng thời gian `6:00` (phải).
        - **Hàng nút điều khiển chính (Căn giữa):** Nút lùi bài/tua lại `⏮`, ở giữa là **Nút Play/Pause hình vuông đen bo góc (`w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center hover:bg-gray-800`)**, bên phải là nút tiến `⏭`.
        - **Hàng điều chỉnh Âm lượng & Tốc độ (Dưới cùng):** Bên trái là icon loa `🔊`, ở giữa là thanh trượt âm lượng màu đen đậm (`h-2 bg-black rounded-full` với nút kéo tròn trắng), bên phải là nút đổi tốc độ phát **`1x`** (`border border-gray-200 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-gray-50`, bấm vào luân chuyển `1x` -> `1.25x` -> `1.5x` -> `2x`).
     2. **Khung 2: `About This Site` Card (`bg-white border border-gray-200 rounded-2xl p-6`):**
        - Tiêu đề có icon thông tin `ⓘ About This Site` (`font-bold text-gray-900`).
        - Nội dung văn bản giới thiệu chi tiết lịch sử, kiến trúc và giá trị văn hóa của địa điểm tại Hà Nội (tự động đổi ngôn ngữ theo lựa chọn).
     3. **Khung 3: `Key Highlights` Card (`bg-white border border-gray-200 rounded-2xl p-6`):**
        - Tiêu đề **`Key Highlights`** (`font-bold text-gray-900`).
        - Danh sách 4–5 gạch đầu dòng (`list-disc pl-5 space-y-2 text-xs text-gray-600`) nêu bật các điểm đặc sắc nhất không thể bỏ lỡ tại di tích đó.
   - **CỘT PHẢI (Chiếm 4/12 cột – Gồm 2 khung Card xếp dọc `space-y-6`):**
     1. **Khung 1: `Quick Information` Card (`bg-white border border-gray-200 rounded-2xl p-6`):**
        - Tiêu đề **`Quick Information`** kèm đường kẻ ngang mảnh `border-b border-gray-100 pb-3 mb-4`.
        - 4 mục thông tin xếp dọc (`space-y-3.5`), mỗi mục gồm nhãn xám nhỏ ở trên và giá trị chữ đen đậm ở dưới:
          - `Location` -> **Hoan Kiem, Hanoi**
          - `UNESCO / Heritage Year` -> **1010**
          - `Category` -> **Cultural**
          - `Audio Duration` -> **6 minutes**
     2. **Khung 2: `Explore More` Card (`bg-white border border-gray-200 rounded-2xl p-6`):**
        - Tiêu đề **`Explore More`** (`font-bold text-sm mb-4`).
        - 2 nút điều hướng có viền mảnh xếp dọc (`space-y-2.5`):
          - Nút 1: `← [Tên địa điểm trước đó]` (căn trái, chuyển tới địa điểm trước).
          - Nút 2: `[Tên địa điểm tiếp theo] →` (căn phải, chuyển tới địa điểm kế tiếp).
3. **Thanh Trình Phát Âm Thanh Cố Định Dưới Đáy (`StickyBottomPlayer.jsx`):**
   - Luôn hiển thị cố định dưới đáy màn hình (`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2.5 z-50 shadow-lg`):
   - Hàng trên: Ảnh thumbnail vuông nhỏ (`w-10 h-10 rounded-md object-cover`) + Tên địa điểm đang phát in đậm (`text-sm font-bold`).
   - Hàng giữa: Thời gian hiện tại bên trái (`2:46`) + Thanh tiến trình dài toàn chiều rộng màn hình (phần đã nghe màu đen `#000`, phần chưa nghe màu xám `#E5E7EB`) + Thời gian còn lại bên phải (`-1:22`).
   - Hàng dưới: Góc trái là icon phát sóng/podcast, chính giữa là cụm 3 nút điều khiển lớn màu đen (`⏪`, `▶/⏸`, `⏩`), góc phải là icon danh sách phát (Queue/Playlist).

---

## 4. Trang Bản Đồ Tương Tác & Tìm Kiếm – `MapPage.jsx` (Route: `/map`) -> Giống hệt `map.png`
- Giao diện chính đặt trong container rộng, chia làm **2 KHỐI RÕ RỆT** có chiều cao bằng nhau (`h-[760px]`):
1. **KHỐI TRÁI: Searching Location & Danh sách POIs (Chiếm ~33% chiều rộng):**
   - Nằm trong khung trắng bo góc lớn (`bg-white border border-gray-200 rounded-2xl p-5 flex flex-col h-full`):
   - Tiêu đề trên cùng: **`Explore HaNoi`** (`text-lg font-extrabold text-gray-900 mb-3`).
   - **Ô tìm kiếm:** Nền xám nhạt bo tròn (`bg-gray-100 rounded-full px-4 py-2.5 text-xs flex items-center gap-2`), có icon kính lúp và chữ `"Searching Locations"`.
   - **Hàng nút lọc danh mục (Filter Pills):** Gồm `All` (nút đen chữ trắng), `Culture`, `Historical`, `Architectural`, `Spiritual` (các nút trắng viền xám mảnh bo tròn `rounded-full px-3 py-1 text-xs`).
   - **Danh sách các Card địa điểm cuộn dọc (`flex-1 overflow-y-auto space-y-3 mt-4 pr-1`):**
     - Mỗi Card (`border border-gray-200 rounded-xl p-3 flex items-center justify-between hover:border-black transition cursor-pointer`):
     - Bên trái: Ảnh vuông bo góc (`w-16 h-16 rounded-lg object-cover`) + Phần chữ gồm: Tên địa điểm in đậm (`text-sm font-bold`), dòng `📍 Hoan Kiem` màu xám nhỏ, và nhãn danh mục màu xanh lá nhạt chữ xanh đậm (`bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold uppercase px-2 py-0.5 rounded`).
     - Góc trên bên phải của mỗi Card: Nút **Trái tim** (hiển thị trái tim đỏ `#EF4444` nếu đã yêu thích, hoặc viền xám `♡` nếu chưa yêu thích).
     - Khi bấm vào 1 Card bên trái: Bản đồ bên phải lập tức di chuyển (`flyTo`) tới đúng tọa độ địa điểm đó tại Hà Nội và mở Popup thuyết minh.
2. **KHỐI PHẢI: Interactive Map (Chiếm ~67% chiều rộng):**
   - Khung bản đồ bo góc lớn (`bg-white border border-gray-200 rounded-2xl overflow-hidden h-full relative`):
   - Nhúng bản đồ tương tác thực tế (**Leaflet / React-Leaflet** hiển thị khu vực Hà Nội) thay cho khung trống.
   - Hiển thị đầy đủ các **Custom Markers** tại đúng tọa độ các di tích Hà Nội, nút định vị GPS **"My Location"**, công cụ bật/tắt **Gợi ý lộ trình tham quan (Recommended Route)** nối các điểm di tích, và Popup khi bấm vào Marker (có ảnh, tên địa điểm, thời lượng audio, nút **"Listen Audio Guide"** dẫn sang `/location/:id`).

---

## 5. Trang Yêu Thích & Thống Kê – `FavoritesPage.jsx` (Route: `/favorites`) -> Giống hệt `favorite.jpg` / `favorite.png`
1. **Khung Hồ Sơ Người Dùng & Thống Kê (`User & Stats Banner Card`):**
   - Một khung ngang bo góc lớn (`bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs`):
   - **Bên trái (Thông tin User):**
     - Avatar hình tròn lớn (`w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center`).
     - Chữ **`User`** in đậm lớn (`text-xl font-extrabold text-gray-900`) và dòng trạng thái bên dưới có chấm tròn xanh dương: `🔵 Explorer Member` (`text-xs text-gray-500`).
   - **Bên phải (2 Thẻ Thống Kê Thời Gian Thực):**
     1. **Thẻ `SAVED SITES` (Thống kê số lượng Audio đã Tim):**
        - Khung nền hồng phấn nhạt viền đỏ mảnh (`bg-red-50/60 border border-red-100 rounded-2xl px-5 py-3.5 flex items-center gap-4 min-w-[180px]`):
        - Bên trái là vòng tròn trắng (`w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center`) chứa icon **Trái tim đỏ (`❤️`)**.
        - Bên phải: Dòng trên là chữ in hoa đỏ `SAVED SITES` (`text-[10px] font-bold tracking-wider text-red-500`), dòng dưới là **Số lượng thực tế màu đỏ đậm** (ví dụ: **`4`** `places`).
     2. **Thẻ `AUDIO LISTENED` (Thống kê số lượng Audio đã Nghe):**
        - Khung nền xám nhạt viền xám mảnh (`bg-gray-50 border border-gray-200/80 rounded-2xl px-5 py-3.5 flex items-center gap-4 min-w-[180px]`):
        - Bên trái là vòng tròn trắng (`w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center`) chứa icon **Play Circle màu đen (`▶️`)**.
        - Bên phải: Dòng trên là chữ in hoa xám `AUDIO LISTENED` (`text-[10px] font-bold tracking-wider text-gray-500`), dòng dưới là **Số lượng audio đã nghe màu đen đậm** (ví dụ: **`12`** `guides`).
2. **Khu vực Danh Sách `Saved Audio Guides`:**
   - **Hàng tiêu đề & Sắp xếp (`flex items-center justify-between mt-10 mb-5`):**
     - Bên trái: Tiêu đề đậm **`Saved Audio Guides`** (`text-lg font-extrabold text-gray-900`) và dòng mô tả nhỏ bên dưới: *"Places you have favorited will appear here."*
     - Bên phải: Cụm 2 nút sắp xếp bo tròn (`rounded-full text-xs font-semibold px-4 py-1.5`):
       - **`Recently Added`** (Active: nền đen chữ trắng `bg-black text-white`).
       - **`A-Z`** (Inactive: nền xám nhạt chữ đen `bg-gray-100 text-gray-700 hover:bg-gray-200`). Khi bấm sẽ sắp xếp danh sách thực tế theo thời gian lưu hoặc theo bảng chữ cái.
   - **Lưới 4 Cột Các Thẻ Yêu Thích (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5`):**
     - **Cấu trúc từng Card Yêu thích (`border border-gray-200 rounded-2xl bg-white p-2.5 flex flex-col justify-between hover:shadow-md transition`):**
       - **Phần ảnh trên (`relative h-40 w-full rounded-xl overflow-visible`):**
         - Ảnh địa danh bo góc (`w-full h-full object-cover rounded-xl`).
         - Góc trên bên phải ảnh: Badge chữ in hoa nền trắng (`CULTURAL`, `HISTORICAL`, `NATURAL` - `bg-white/95 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs`).
         - **Nút Trái Tim Nổi Góc Dưới Bên Phải Ảnh (`absolute -bottom-4 right-3 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:scale-110 transition`):** Chứa icon trái tim đỏ `❤️` (bấm vào sẽ bỏ tim/xóa khỏi danh sách yêu thích và cập nhật ngay con số ở thẻ `SAVED SITES`).
       - **Phần thân Card (`pt-5 px-1.5 pb-1`):**
         - Tên địa điểm in đậm (`text-sm font-bold text-gray-900`).
         - Dòng địa chỉ nhỏ (`📍 Hoan Kiem, Hanoi` - `text-xs text-gray-500 mt-1`).
         - **Nút phát Audio dưới cùng (`mt-3 w-full bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-3 flex items-center gap-2 text-xs font-semibold text-gray-800 transition`):** Có icon Play tròn đen `▶` + chữ `Audio guide: 6 min`. Bấm vào sẽ phát ngay thuyết minh của địa điểm đó và tăng bộ đếm `AUDIO LISTENED`.
     - **Ô Placeholder trống (Giống cột thứ 4 trong `favorite.jpg`):** Nếu số lượng thẻ trên hàng chưa lấp đầy 4 cột, hiển thị thêm khung viền mảnh trống (`border border-gray-100 rounded-2xl min-h-[260px] bg-gray-50/20`) để giữ nguyên bố cục 4 cột cân đối như ảnh thiết kế.

---

## 6. Trang `AboutUsPage.jsx` (Route: `/about`) & `Footer.jsx` (Tự thiết kế đồng bộ)
1. **Trang `About us` (`/about`):**
   - Thiết kế hoàn toàn đồng bộ với phong cách trắng – đen – xám thanh lịch của 4 trang trên:
   - **Hero Section:** Tiêu đề lớn *"Preserving Hanoi's Millennial Heritage Through Smart Audio"* kèm số liệu thống kê (1000+ Năm Lịch Sử, 15+ Ngôn Ngữ Tự Động, Định Vị GPS Thời Gian Thực, Hoạt Động Đa Nền Tảng Web & Mobile).
   - **Khối Tính Năng Cốt Lõi (Theo PRD):**
     1. *GPS Proximity Auto-Trigger:* Tự động nhận diện vị trí du khách và gợi ý thuyết minh khi bước vào bán kính di tích.
     2. *AI Multilingual Pipeline:* Bản dịch văn bản và giọng đọc tự nhiên hỗ trợ khách du lịch quốc tế tự túc không cần hướng dẫn viên.
     3. *Smart Route Recommendation:* Đề xuất hành trình đi bộ khám phá Phố Cổ – Hồ Gươm – Hoàng Thành tối ưu nhất.
   - **Khối Kiến Trúc Tương Lai (Web + React Native + CI/CD):** Giới thiệu định hướng mở rộng đa nền tảng và quy trình vận hành thông minh.
2. **Chân trang (`Footer.jsx`):**
   - Đặt ở cuối tất cả các trang (có khoảng đệm `pb-24` khi thanh `StickyBottomPlayer` đang bật để không bị che khuất).
   - Bố cục 4 cột gọn gàng: Thông tin dự án **Hanoi Heritage Audio Guide**, Liên kết điều hướng nhanh (`Explore`, `Interactive Map`, `Saved Guides`, `About Us`), Danh sách Di sản Hà Nội tiêu biểu, và Chuyển đổi ngôn ngữ nhanh + Bản quyền.

---

# ⚡ PHẦN 3: CÁC BƯỚC THỰC THI BẮT BUỘC

1. **Bước 1:** Quan sát kỹ 4 ảnh trong `samplepic/` để nắm rõ từng chi tiết UI đã mô tả ở trên.
2. **Bước 2:** Tạo cấu trúc thư mục đầy đủ (bao gồm cả `.github/workflows/ci-cd.yml` và `mobile-react-native-blueprint/ARCHITECTURE.md`).
3. **Bước 3:** Viết và chạy script tự động tải toàn bộ ảnh thật của các di sản Hà Nội và các file SVG về thư mục `public/assets/images/landmarks/` và `src/assets/icons/`. Kiểm tra đảm bảo 100% ảnh hoạt động tốt.
4. **Bước 4:** Xây dựng đầy đủ dữ liệu đa ngôn ngữ cho các di tích Hà Nội trong `src/core/data/hanoiHeritageSites.js`, Context quản lý trạng thái Tim (`Saved Sites`), Lịch sử nghe (`Audio Listened`) và Trình phát Audio (`StickyBottomPlayer` + `LocationDetailPage` player).
5. **Bước 5:** Hoàn thiện toàn bộ các trang `ExplorePage`, `LocationDetailPage`, `MapPage`, `FavoritesPage`, `AboutUsPage`, `HeaderNavbar`, `Footer` với đầy đủ hiệu ứng hover, lọc dữ liệu, bản đồ tương tác và kiểm tra hiển thị chuẩn xác ở mức zoom 100%.