from PIL import Image

def process():
    img = Image.open('public/assets/decor/florals.webp').convert('RGBA')
    datas = img.getdata()
    new_data = []
    for r, g, b, a in datas:
        if r > 235 and g > 235 and b > 235:
            # Smooth falloff between 235 and 255
            fade = (min(r, g, b) - 235) / 20.0
            alpha = int(255 * (1.0 - fade))
            new_data.append((r, g, b, max(0, min(255, alpha))))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)
    img.save('public/assets/decor/florals.webp', 'WEBP')
    img.save('public/assets/decor/florals.png', 'PNG')
    print('Successfully created transparent florals.webp!')

if __name__ == '__main__':
    process()
