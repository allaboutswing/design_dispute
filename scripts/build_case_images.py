from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / "public" / "pages"
CASES_DIR = ROOT / "public" / "cases"


CropSpec = dict[str, tuple[str, tuple[int, int, int, int]]]


CROPS: dict[str, CropSpec] = {
    "001": {
        "plaintiff": ("page_013.png", (120, 80, 560, 430)),
        "defendant": ("page_012.png", (760, 1030, 1040, 1285)),
        "comparison": ("page_012.png", (110, 760, 1080, 1285)),
    },
    "002": {
        "plaintiff": ("page_017.png", (240, 930, 620, 1460)),
        "defendant": ("page_017.png", (690, 930, 1040, 1460)),
        "comparison": ("page_017.png", (110, 860, 1080, 1460)),
    },
    "003": {
        "plaintiff": ("page_018.png", (90, 900, 1090, 1145)),
        "defendant": ("page_020.png", (120, 250, 980, 730)),
        "comparison": ("page_020.png", (120, 250, 980, 730)),
    },
    "004": {
        "plaintiff": ("page_023.png", (320, 330, 560, 610)),
        "defendant": ("page_023.png", (650, 320, 1030, 615)),
        "comparison": ("page_023.png", (320, 330, 1030, 615)),
    },
    "005": {
        "plaintiff": ("page_027.png", (200, 950, 520, 1365)),
        "defendant": ("page_027.png", (700, 950, 1010, 1365)),
        "comparison": ("page_029.png", (120, 250, 1040, 1030)),
    },
    "006": {
        "plaintiff": ("page_034.png", (110, 220, 520, 590)),
        "defendant": ("page_034.png", (630, 220, 1040, 590)),
        "comparison": ("page_034.png", (90, 180, 1060, 620)),
    },
    "007": {
        "plaintiff": ("page_039.png", (250, 230, 520, 890)),
        "defendant": ("page_039.png", (650, 170, 965, 890)),
        "comparison": ("page_037.png", (180, 260, 1080, 880)),
    },
    "008": {
        "plaintiff": ("page_042.png", (180, 250, 540, 1120)),
        "defendant": ("page_042.png", (700, 250, 980, 1100)),
        "comparison": ("page_042.png", (120, 140, 1020, 1130)),
    },
    "009": {
        "plaintiff": ("page_045.png", (180, 170, 610, 1180)),
        "defendant": ("page_045.png", (620, 170, 1050, 1180)),
        "comparison": ("page_045.png", (140, 120, 1070, 1200)),
    },
    "010": {
        "plaintiff": ("page_048.png", (140, 180, 560, 1120)),
        "defendant": ("page_048.png", (570, 180, 1050, 1120)),
        "comparison": ("page_046.png", (170, 250, 1050, 970)),
    },
    "011": {
        "plaintiff": ("page_051.png", (160, 170, 620, 1120)),
        "defendant": ("page_051.png", (650, 170, 1040, 1120)),
        "comparison": ("page_049.png", (170, 250, 1045, 980)),
    },
    "012": {
        "plaintiff": ("page_054.png", (140, 170, 590, 1130)),
        "defendant": ("page_054.png", (610, 170, 1040, 900)),
        "comparison": ("page_052.png", (150, 250, 1050, 980)),
    },
    "013": {
        "plaintiff": ("page_056.png", (150, 860, 590, 1320)),
        "defendant": ("page_056.png", (610, 860, 1040, 1320)),
        "comparison": ("page_055.png", (170, 250, 1050, 990)),
    },
    "014": {
        "plaintiff": ("page_059.png", (250, 220, 930, 900)),
        "defendant": ("page_060.png", (300, 170, 830, 500)),
        "comparison": ("page_061.png", (220, 760, 1010, 1370)),
    },
    "015": {
        "plaintiff": ("page_063.png", (280, 650, 610, 1190)),
        "defendant": ("page_063.png", (640, 650, 980, 1190)),
        "comparison": ("page_064.png", (170, 170, 1040, 760)),
    },
    "016": {
        "plaintiff": ("page_067.png", (360, 780, 630, 1230)),
        "defendant": ("page_067.png", (720, 790, 1010, 1220)),
        "comparison": ("page_067.png", (280, 740, 1040, 1240)),
    },
    "017": {
        "plaintiff": ("page_071.png", (220, 850, 560, 1400)),
        "defendant": ("page_071.png", (650, 850, 980, 1390)),
        "comparison": ("page_070.png", (170, 420, 1000, 980)),
    },
    "018": {
        "plaintiff": ("page_074.png", (110, 150, 440, 590)),
        "defendant": ("page_074.png", (110, 710, 440, 1150)),
        "comparison": ("page_074.png", (80, 120, 1030, 1190)),
    },
    "019": {
        "plaintiff": ("page_076.png", (150, 300, 500, 1220)),
        "defendant": ("page_076.png", (620, 300, 970, 1220)),
        "comparison": ("page_076.png", (110, 130, 1030, 1230)),
    },
    "020": {
        "plaintiff": ("page_078.png", (430, 1000, 700, 1505)),
        "defendant": ("page_079.png", (690, 995, 1025, 1455)),
        "comparison": ("page_079.png", (150, 350, 1080, 980)),
    },
}


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def build_case_003_comparison(target_dir: Path) -> None:
    with Image.open(PAGES_DIR / "page_018.png") as source_a:
        plaintiff = source_a.crop((90, 900, 1090, 1145))

    with Image.open(PAGES_DIR / "page_020.png") as source_b:
        defendant = source_b.crop((120, 250, 980, 730))

    card_width = 560
    card_height = 360
    canvas = Image.new("RGB", (1180, 520), "#f5f7fb")

    def fit(image: Image.Image, width: int, height: int) -> Image.Image:
        copy = image.copy()
        copy.thumbnail((width, height))
        return copy

    left = fit(plaintiff, 500, 280)
    right = fit(defendant, 500, 280)

    left_card = Image.new("RGB", (card_width, card_height), "white")
    right_card = Image.new("RGB", (card_width, card_height), "white")

    left_x = (card_width - left.width) // 2
    left_y = (card_height - left.height) // 2
    right_x = (card_width - right.width) // 2
    right_y = (card_height - right.height) // 2

    left_card.paste(left, (left_x, left_y))
    right_card.paste(right, (right_x, right_y))

    canvas.paste(left_card, (20, 80))
    canvas.paste(right_card, (600, 80))

    canvas.save(target_dir / "comparison.png", format="PNG")


def build_case_004_comparison(target_dir: Path) -> None:
    with Image.open(PAGES_DIR / "page_023.png") as source:
        plaintiff = source.crop((320, 330, 560, 610))
        defendant = source.crop((650, 320, 1030, 615))

    card_width = 560
    card_height = 360
    canvas = Image.new("RGB", (1180, 520), "#f5f7fb")

    def fit(image: Image.Image, width: int, height: int) -> Image.Image:
        copy = image.copy()
        copy.thumbnail((width, height))
        return copy

    left = fit(plaintiff, 480, 300)
    right = fit(defendant, 480, 300)

    left_card = Image.new("RGB", (card_width, card_height), "white")
    right_card = Image.new("RGB", (card_width, card_height), "white")

    left_card.paste(left, ((card_width - left.width) // 2, (card_height - left.height) // 2))
    right_card.paste(right, ((card_width - right.width) // 2, (card_height - right.height) // 2))

    canvas.paste(left_card, (20, 80))
    canvas.paste(right_card, (600, 80))

    canvas.save(target_dir / "comparison.png", format="PNG")


def build_case_images() -> None:
    for case_id, spec in CROPS.items():
        target_dir = CASES_DIR / case_id
        ensure_dir(target_dir)

        for key, (page_name, box) in spec.items():
            page_path = PAGES_DIR / page_name
            if not page_path.exists():
                raise FileNotFoundError(f"Missing source page: {page_path}")

            with Image.open(page_path) as image:
                cropped = image.crop(box)
                output_path = target_dir / f"{key}.png"
                cropped.save(output_path, format="PNG")
                print(f"saved {output_path}")

        if case_id == "003":
            build_case_003_comparison(target_dir)
            print(f"saved {target_dir / 'comparison.png'}")
        if case_id == "004":
            build_case_004_comparison(target_dir)
            print(f"saved {target_dir / 'comparison.png'}")


if __name__ == "__main__":
    build_case_images()
