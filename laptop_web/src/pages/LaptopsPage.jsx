//pages/LaptopsPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateLaptopCard from '../components/CreateLaptopCard.jsx';
import LaptopTable from '../components/LaptopTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { createLaptop, getLaptops } from '../services/laptopService.js';

function LaptopsPage({ token, onSetMessage }) {
  const navigate = useNavigate();
  const [laptopForm, setLaptopForm] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
  });
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useMemo(() => Boolean(token), [token]);

  const loadLaptops = async () => {
    setLoading(true);
    onSetMessage('');

    try {
      const data = await getLaptops();
      setLaptops(data.laptops || []);
    } catch (err) {
      onSetMessage(err.message || 'Không kết nối được API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLaptops();
  }, []);

  const onCreateLaptop = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      onSetMessage('Bạn cần đăng nhập trước khi tạo laptop.');
      navigate('/auth');
      return;
    }

    onSetMessage('');

    try {
      const payload = { ...laptopForm, price: Number(laptopForm.price) };
      const data = await createLaptop(payload, token);

      onSetMessage(data.message || 'Tạo laptop thành công.');
      setLaptopForm({ name: '', brand: '', price: '', description: '' });
      loadLaptops();
    } catch (err) {
      onSetMessage(err.message || 'Lỗi kết nối khi tạo laptop.');
    }
  };

  return (
    <>
      <PageHeader
        title="Laptops"
        description="Xem danh sách laptop và thêm mới khi đã đăng nhập."
      />

      <CreateLaptopCard
        form={laptopForm}
        onChange={setLaptopForm}
        onSubmit={onCreateLaptop}
        isLoggedIn={isLoggedIn}
      />

      <LaptopTable laptops={laptops} loading={loading} onRefresh={loadLaptops} />
    </>
  );
}

export default LaptopsPage;
