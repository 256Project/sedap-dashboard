import { useCallback, useState } from 'react';
import { Card, Button, Badge, Table, Modal, Input, Select, Pagination, Tabs } from '../components/ui';
export default function ComponentExamples() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('new');
  const [tab, setTab] = useState('list');
  const [page, setPage] = useState(1);
  return <div className="component-examples"><div className="page-heading"><div><h1>Umumiy komponentlar</h1><p>Jamoa uchun foydalanish misollari</p></div></div><Card title="Card va Button" description="Card ichiga istalgan kontent qo‘yiladi"><div className="example-row"><Button onClick={() => setOpen(true)}>Modalni ochish</Button><Button variant="secondary">Secondary</Button><Button variant="danger">Danger</Button><Badge status="completed" /><Badge status="pending" /><Badge status="failed" /></div></Card><Card title="Input, Select va Tabs"><div className="example-row"><Input label="Ism" value={name} onChange={e => setName(e.target.value)} placeholder="Mijoz ismi" /><Select label="Status" value={status} onChange={e => setStatus(e.target.value)} options={[{
          value: 'new',
          label: 'Yangi'
        }, {
          value: 'delivered',
          label: 'Yetkazildi'
        }]} /><Tabs value={tab} onChange={setTab} options={[{
          value: 'list',
          label: 'Ro‘yxat'
        }, {
          value: 'grid',
          label: 'Setka'
        }]} /></div><p className="example-output">Ism: {name || '—'} · Status: {status} · Ko‘rinish: {tab}</p></Card><Card title="Table va Pagination"><Table columns={[{
        key: 'id',
        label: 'ID'
      }, {
        key: 'name',
        label: 'Mijoz'
      }, {
        key: 'status',
        label: 'Status',
        render: value => <Badge status={value} />
      }]} data={[{
        id: 1,
        name: 'Akbar',
        status: 'completed'
      }, {
        id: 2,
        name: 'Sherzod',
        status: 'pending'
      }].slice(page - 1, page)} /><Pagination page={page} pageSize={1} total={2} onChange={setPage} /></Card><Modal open={open} onClose={close} title="Modal misoli"><p>Escape, tashqi fon yoki yopish tugmasi bilan yopiladi.</p><Button onClick={close}>Tayyor</Button></Modal></div>;
}
