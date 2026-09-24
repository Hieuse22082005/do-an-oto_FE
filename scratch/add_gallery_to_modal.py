import codecs

file_path = 'components/modals/CarDetailModal.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

old_hooks = """  // Build media list
  const mediaList = [];
  if (car.video_url) {
    mediaList.push({ type: 'video', url: car.video_url });
  }
  if (car.image_url) {
    mediaList.push({ type: 'image', url: car.image_url });
  }
  // Fallback if neither exists
  if (mediaList.length === 0) {
    mediaList.push({ type: 'image', url: 'https://via.placeholder.com/800x600' });
  }"""

new_hooks = """  // Build media list
  const mediaList = [];
  if (car.video_url) {
    mediaList.push({ type: 'video', url: car.video_url });
  }
  if (car.image_url) {
    mediaList.push({ type: 'image', url: car.image_url });
  }
  if (car.gallery && Array.isArray(car.gallery)) {
    car.gallery.forEach((url: string) => {
      mediaList.push({ type: 'image', url });
    });
  }
  // Fallback if neither exists
  if (mediaList.length === 0) {
    mediaList.push({ type: 'image', url: 'https://via.placeholder.com/800x600' });
  }"""

content = content.replace(old_hooks, new_hooks)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated CarDetailModal with gallery support!")
