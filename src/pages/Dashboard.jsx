import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const itemsRef = collection(db, 'marketplace');

  const fetchItems = async () => {
    const snapshot = await getDocs(itemsRef);
    const data = snapshot.docs.map(doc => ({ 
      id: doc.id,
      ...doc.data()
    })); setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !imageFile) { setMessage('❌ Da fatan cike dukkan bayanai!'); return; }

    try {
      setLoading(true);
      const fileExt = imageFile.name.split('.').pop();
      const safeName = imageFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
      const storageRef = ref(storage, `images / ${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed', null, (error) => {
        console.error('❌ Upload Error:', error);
        setMessage('❌ Kuskure yayin loda hoton.');
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(itemsRef, {
          title,
          price,
          imageUrl: downloadURL,
          createdAt: new Date()
        });
        setTitle('');
        setPrice('');
        setImageFile(null);
        setMessage('✅ An saka samfur lafiya!');
        fetchItems();
      });

    } catch (error) {
      console.error('❌ Kuskure yayin adanawa:', error);
      setMessage('❌ Kuskure yayin adanawa.');
    } finally {
      setLoading(false);
    }

  };

  const handleDelete = async (id, imageUrl) => { try { await deleteDoc(doc(db, 'marketplace', id)); const imageRef = ref(storage, imageUrl); await deleteObject(imageRef); setItems(items.filter(item => item.id !== id)); setMessage('🗑️ An share samfur.'); } catch (error) { console.error('❌ Delete Error:', error); } };

  return (<div className="p-4 max-w-4xl mx-auto"> <h1 className="text-2xl font-bold mb-4">📋 Dashboard - Saka Sabon Samfur</h1>

    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Input
        type="text"
        placeholder="Sunan samfur"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Farashin samfur"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Ana aika...' : 'Aika'}
      </Button>
    </form>

    {message && (
      <p className="text-sm text-green-700 bg-green-100 p-2 rounded">{message}</p>
    )}

    <div className="grid md:grid-cols-3 gap-4">
      {items.map(item => (
        <Card key={item.id}>
          <CardContent className="p-2">
            <img src={item.imageUrl} alt={item.title} className="h-40 w-full object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm">₦{item.price}</p>
            <Button
              variant="destructive"
              size="sm"
              className="mt-2"
              onClick={() => handleDelete(item.id, item.imageUrl)}
            >
              🗑️ Share
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>

  );
};

export default Dashboard;