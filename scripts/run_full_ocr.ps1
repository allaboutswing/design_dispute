$python = "C:\Users\jemin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$root = "C:\codex\codex_2"
$batches = @(
  @{ Start = 41; End = 80; Output = "data\ocr-batches\ocr-041-080.json" },
  @{ Start = 81; End = 120; Output = "data\ocr-batches\ocr-081-120.json" },
  @{ Start = 121; End = 160; Output = "data\ocr-batches\ocr-121-160.json" },
  @{ Start = 161; End = 200; Output = "data\ocr-batches\ocr-161-200.json" },
  @{ Start = 201; End = 240; Output = "data\ocr-batches\ocr-201-240.json" },
  @{ Start = 241; End = 280; Output = "data\ocr-batches\ocr-241-280.json" },
  @{ Start = 281; End = 320; Output = "data\ocr-batches\ocr-281-320.json" },
  @{ Start = 321; End = 360; Output = "data\ocr-batches\ocr-321-360.json" },
  @{ Start = 361; End = 387; Output = "data\ocr-batches\ocr-361-387.json" }
)

Set-Location $root
New-Item -ItemType Directory -Force "data\ocr-batches" | Out-Null

foreach ($batch in $batches) {
  & $python "scripts\ocr_pages.py" --start $batch.Start --end $batch.End --output $batch.Output
}

& $python -c "import json, pathlib; root=pathlib.Path(r'$root'); files=sorted((root / 'data' / 'ocr-batches').glob('ocr-*.json')); merged=[]; [merged.extend(json.loads(p.read_text(encoding='utf-8'))) for p in files]; merged=sorted(merged, key=lambda x: x['page']); (root / 'data' / 'ocr-pages.json').write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding='utf-8')"
& $python "scripts\build_cases_json.py"
