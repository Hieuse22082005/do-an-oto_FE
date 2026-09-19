import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# Remove supabase import
text = text.replace("import { supabase } from '../../supabaseClient';", "")

# Replace fetchListings
old_fetch = """  const fetchListings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('showroom_cars')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching listings:", error);
        setListings(mockListings);
      } else if (data && data.length > 0) {
        setListings([...data, ...mockListings.filter(m => !data.find((d:any) => d.model === m.model))]);
      } else {
        setListings(mockListings);
      }
    } catch (err) {
      console.error(err);
      setListings(mockListings);
    }
    setLoading(false);
  };"""

new_fetch = """  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      if (data && data.length > 0) {
        setListings([...data, ...mockListings.filter(m => !data.find((d:any) => d.model === m.model))]);
      } else {
        setListings(mockListings);
      }
    } catch (err) {
      console.error("Error fetching listings from API:", err);
      setListings(mockListings);
    }
    setLoading(false);
  };"""

text = text.replace(old_fetch, new_fetch)

# Replace handleUpdateStatus
old_update = """  const handleUpdateStatus = async (carId: string, newStatus: string) => {
    if (carId.startsWith('mock-')) {
      alert("Đã cập nhật trạng thái trên xe mẫu thành công!");
      setSelectedCar(null);
      setListings(listings.map(c => c.id === carId ? { ...c, status: newStatus } : c));
      return;
    }
    
    try {
      const { error } = await supabase
        .from('showroom_cars')
        .update({ status: newStatus })
        .eq('id', carId);
        
      if (error) throw error;
      
      alert(`Thành công! Xe đã được xác nhận mua.`);
      setSelectedCar(null);
      fetchListings();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Có lỗi xảy ra khi cập nhật!');
    }
  };"""

new_update = """  const handleUpdateStatus = async (carId: string, newStatus: string) => {
    if (carId.startsWith('mock-')) {
      alert("Đã cập nhật trạng thái trên xe mẫu thành công!");
      setSelectedCar(null);
      setListings(listings.map(c => c.id === carId ? { ...c, status: newStatus } : c));
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/cars/${carId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('API Error');
      
      alert(`Thành công! Xe đã được xác nhận mua.`);
      setSelectedCar(null);
      fetchListings();
    } catch (error) {
      console.error('Error updating status via API:', error);
      alert('Có lỗi xảy ra khi cập nhật!');
    }
  };"""

text = text.replace(old_update, new_update)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(text)

print("Updated FE to use BE API instead of Supabase client.")
