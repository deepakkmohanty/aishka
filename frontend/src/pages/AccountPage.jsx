import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import api from '../utils/api';
import usersService from '../services/users.service';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CLIP = 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)';

const STATUS_STYLES = {
  Delivered:  'bg-green-50  text-green-700  border-green-200',
  Processing: 'bg-amber-50  text-amber-700  border-amber-200',
  Shipped:    'bg-blue-50   text-blue-700   border-blue-200',
  Cancelled:  'bg-red-50    text-red-700    border-red-200',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SMALL REUSABLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Sparkle = ({ size = 12, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
    className={`text-[#C8A24A] ${className}`} aria-hidden="true">
    <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" />
  </svg>
);

// Gold underline input
const LineInput = ({ id, label, type = 'text', value, onChange, disabled, placeholder, readOnly }) => (
  <div className="flex flex-col gap-1.5 group">
    <label htmlFor={id}
      className="font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#6B1E2E]/50
                 group-focus-within:text-[#C8A24A] transition-colors duration-300">
      {label}
    </label>
    <input
      id={id} type={type} value={value} onChange={onChange}
      disabled={disabled} readOnly={readOnly} placeholder={placeholder}
      className={`bg-transparent border-0 border-b py-2.5 font-sans text-sm text-[#6B1E2E] outline-none
                  transition-colors duration-300 placeholder-[#6B1E2E]/25
                  ${readOnly || disabled
                    ? 'border-[#C8A24A]/15 text-[#6B1E2E]/40 cursor-not-allowed'
                    : 'border-[#C8A24A]/30 focus:border-[#C8A24A]'}`}
    />
  </div>
);

// Gold pill action button (small, outlined)
const OutlineBtn = ({ children, onClick, className = '', danger = false }) => (
  <button
    onClick={onClick}
    className={`font-sans text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2
                border transition-all duration-200
                ${danger
                  ? 'border-red-300 text-red-600 hover:bg-red-50'
                  : 'border-[#C8A24A]/50 text-[#6B1E2E] hover:border-[#C8A24A] hover:text-[#C8A24A]'}
                ${className}`}
  >
    {children}
  </button>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// USER AVATAR (initials)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Avatar = ({ name = '', size = 52 }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

  return (
    <div
      className="rounded-full bg-[#C8A24A] flex items-center justify-center shrink-0 select-none"
      style={{ width: size, height: size }}
    >
      <span
        className="font-serif font-bold text-[#6B1E2E] leading-none"
        style={{ fontSize: size * 0.38 }}
      >
        {initials || '?'}
      </span>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIDEBAR NAV ITEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const NavItem = ({ icon, label, active, onClick, danger = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 relative
                font-sans text-[11px] font-semibold uppercase tracking-[0.2em]
                ${danger
                  ? 'text-[#6B1E2E]/60 hover:text-red-600 hover:bg-red-50/50'
                  : active
                    ? 'text-[#C8A24A] bg-[#C8A24A]/8'
                    : 'text-[#6B1E2E]/60 hover:text-[#6B1E2E] hover:bg-[#6B1E2E]/4'}`}
  >
    {/* Active left border */}
    {active && !danger && (
      <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#C8A24A] rounded-r-full" />
    )}
    <span className={`${active && !danger ? 'text-[#C8A24A]' : danger ? 'text-red-500/70' : 'text-[#6B1E2E]/40'}`}>
      {icon}
    </span>
    {label}
  </button>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAB 1 — PROFILE INFO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ProfileTab = ({ user }) => {
  const [form, setForm] = useState({
    name:  user?.name  || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob:   user?.dob   || '',
  });
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '' });
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  
  const [passSaving, setPassSaving] = useState(false);
  const [passSaved, setPassSaved] = useState(false);
  const [passError, setPassError] = useState('');

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const setPass = k => e => setPassForm(f => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await usersService.getProfile();
        if (res.success) {
          setForm({
            name: res.data.name || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            dob: res.data.date_of_birth || ''
          });
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await usersService.updateProfile({ name: form.name, phone: form.phone });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSaving(true);
    try {
      await usersService.changePassword(passForm);
      setPassSaved(true);
      setPassForm({ currentPassword: '', newPassword: '' });
      setTimeout(() => setPassSaved(false), 3000);
    } catch (err) {
      setPassError(err.response?.data?.message || err.message || 'Failed to change password');
    } finally {
      setPassSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#C8A24A] mb-1">
          ✦ Your Details ✦
        </span>
        <h2 className="font-serif text-[#6B1E2E] text-2xl md:text-3xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Profile Information
        </h2>
        <div className="w-10 h-px bg-[#C8A24A]/40 mt-3" />
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-8">
        <LineInput id="p-name"  label="Full Name"     value={form.name}  onChange={set('name')}  placeholder="Your name" />
        <LineInput id="p-email" label="Email Address" value={form.email} readOnly  placeholder="Email" type="email" />
        <LineInput id="p-phone" label="Phone Number"  value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" type="tel" />
        <LineInput id="p-dob"   label="Date of Birth" value={form.dob}   onChange={set('dob')}   type="date" />

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C8A24A] text-[#6B1E2E]
                       font-sans text-[10px] font-bold uppercase tracking-[0.3em]
                       hover:bg-[#E8C766] transition-all duration-300 disabled:opacity-60"
            style={{ clipPath: CLIP }}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          {saved && (
            <span className="font-sans text-[11px] text-green-600 flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Changes saved
            </span>
          )}
        </div>
      </form>

      <div className="mt-16 mb-8">
        <h3 className="font-serif text-[#6B1E2E] text-xl md:text-2xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Change Password
        </h3>
        <div className="w-10 h-px bg-[#C8A24A]/40 mt-3" />
      </div>

      <form onSubmit={handlePasswordSubmit} className="max-w-lg flex flex-col gap-8">
        <LineInput id="p-curr" label="Current Password" value={passForm.currentPassword} onChange={setPass('currentPassword')} type="password" />
        <LineInput id="p-new" label="New Password" value={passForm.newPassword} onChange={setPass('newPassword')} type="password" />
        
        {passError && <p className="font-sans text-[11px] text-red-600">{passError}</p>}
        
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={passSaving || !passForm.currentPassword || !passForm.newPassword}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#C8A24A]/50 text-[#6B1E2E]
                       font-sans text-[10px] font-bold uppercase tracking-[0.3em]
                       hover:border-[#C8A24A] hover:bg-[#C8A24A]/8 transition-all duration-300 disabled:opacity-60"
          >
            {passSaving ? 'Updating…' : 'Update Password'}
          </button>
          {passSaved && (
            <span className="font-sans text-[11px] text-green-600 flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Password updated
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAB 2 — ORDER HISTORY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const OrdersTab = () => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/orders/my-orders');
        const orderData = res.data?.data?.orders || [];
        setOrders(orderData);
      } catch (err) {
        console.error('Failed to load orders', err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const fmt = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div>
      <div className="mb-8">
        <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#C8A24A] mb-1">
          ✦ Purchase History ✦
        </span>
        <h2 className="font-serif text-[#6B1E2E] text-2xl md:text-3xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Order History
        </h2>
        <div className="w-10 h-px bg-[#C8A24A]/40 mt-3" />
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-[#C8A24A]/8 animate-pulse rounded-sm" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center text-center py-16 border border-[#C8A24A]/20 bg-white">
          <Sparkle size={32} className="mb-4 opacity-50" />
          <p className="font-serif italic text-[#6B1E2E]/70 text-xl mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            No orders yet.
          </p>
          <p className="font-sans text-sm text-[#6B1E2E]/50 mb-6">
            Start shopping and your orders will appear here.
          </p>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#C8A24A] text-[#6B1E2E]
                       font-sans text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#E8C766] transition-colors"
            style={{ clipPath: CLIP }}
          >
            Shop Now →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order) => {
            const status = order.order_status || order.status || 'processing';
            const items  = order.items || [];
            const total  = order.total || 0;
            const id     = order.id;
            const date   = order.created_at || order.date;

            return (
              <div
                key={id}
                className="border border-[#C8A24A]/20 bg-white hover:border-[#C8A24A]/50
                           transition-all duration-300 overflow-hidden"
              >
                {/* Receipt header */}
                <div className="flex flex-wrap items-center justify-between gap-3
                                px-5 py-3.5 border-b border-[#C8A24A]/15 bg-white">
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B1E2E]">
                      Order #{id}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#C8A24A]/50" />
                    <span className="font-sans text-[10px] text-[#6B1E2E]/55">
                      {date ? fmt(date) : '—'}
                    </span>
                  </div>
                  {/* Status pill */}
                  <span className={`font-sans text-[9px] font-bold uppercase tracking-[0.15em]
                                   px-2.5 py-1 border rounded-full ${STATUS_STYLES[status.charAt(0).toUpperCase() + status.slice(1)] || STATUS_STYLES.Processing}`}>
                    {status}
                  </span>
                </div>

                {/* Items summary */}
                <div className="px-5 py-4">
                  <p className="font-sans text-xs text-[#6B1E2E]/65 leading-relaxed mb-4">
                    {items.map((it, i) => (
                      <span key={i}>
                        {it.name || it.product?.name || 'Item'} × {it.qty || it.quantity || 1}
                        {i < items.length - 1 ? ',  ' : ''}
                      </span>
                    ))}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#6B1E2E]/45 block mb-0.5">
                        Order Total
                      </span>
                      <span
                        className="font-serif text-xl text-[#C8A24A]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        ₹{Number(total).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <OutlineBtn>View Order</OutlineBtn>
                      {status !== 'Cancelled' && status !== 'Delivered' && (
                        <OutlineBtn>Track Order</OutlineBtn>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADDRESS FORM (inline modal-like)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AddressForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || {
    label: '', name: '', address_line: '', city: '', state: '', pincode: '', phone: '', is_default: false,
  });
  const [saving, setSaving] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 600)); // simulated async
    onSave(form);
    setSaving(false);
  };

  return (
    <div className="border border-[#C8A24A]/30 bg-white p-6 md:p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-[#6B1E2E] text-xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {initial ? 'Edit Address' : 'Add New Address'}
        </h3>
        <button onClick={onCancel}
          className="font-sans text-[10px] text-[#6B1E2E]/50 hover:text-[#C8A24A] uppercase tracking-[0.2em] transition-colors">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <LineInput id="af-label"   label="Label (Home / Office)" value={form.label}        onChange={set('label')}        placeholder="Home" />
          <LineInput id="af-name"    label="Full Name"              value={form.name}         onChange={set('name')}         placeholder="Recipient name" />
          <LineInput id="af-line1"   label="Address Line 1"         value={form.line1}        onChange={set('line1')}        placeholder="Flat, Building, Street" />
          <LineInput id="af-line2"   label="Address Line 2 (Opt)"   value={form.line2}        onChange={set('line2')}        placeholder="Landmark, Area" />
          <LineInput id="af-phone"   label="Phone"                  value={form.phone}        onChange={set('phone')}        placeholder="+91 XXXXX XXXXX" type="tel" />
          <LineInput id="af-city"    label="City"                   value={form.city}         onChange={set('city')}         placeholder="Bhubaneswar" />
          <LineInput id="af-state"   label="State"                  value={form.state}        onChange={set('state')}        placeholder="Odisha" />
          <LineInput id="af-pin"     label="Pincode"                value={form.pincode}      onChange={set('pincode')}      placeholder="751001" />
        </div>

        <label className="flex items-center gap-2.5 mb-7 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_default}
            onChange={e => setForm(f => ({ ...f, is_default: e.target.checked }))}
            className="w-4 h-4 accent-[#C8A24A]"
          />
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6B1E2E]/65">
            Set as default address
          </span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C8A24A] text-[#6B1E2E]
                     font-sans text-[10px] font-bold uppercase tracking-[0.3em]
                     hover:bg-[#E8C766] transition-all duration-300 disabled:opacity-60"
          style={{ clipPath: CLIP }}
        >
          {saving ? 'Saving…' : initial ? 'Update Address' : 'Add Address'}
        </button>
      </form>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAB 3 — SAVED ADDRESSES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AddressesTab = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await usersService.getAddresses();
      if (res.success) {
        setAddresses(res.data);
      }
    } catch (err) {
      console.error('Failed to load addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      let res;
      if (editing) {
        res = await usersService.updateAddress(editing.id, formData);
      } else {
        res = await usersService.addAddress(formData);
      }
      if (res.success) {
        setAddresses(res.data);
      }
    } catch (err) {
      console.error('Failed to save address:', err);
    } finally {
      setShowForm(false);
      setEditing(null);
    }
  };

  const handleEdit = (addr) => {
    setEditing(addr);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this address?')) return;
    try {
      const res = await usersService.deleteAddress(id);
      if (res.success) {
        setAddresses(res.data);
      }
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#C8A24A] mb-1">
            ✦ Delivery Destinations ✦
          </span>
          <h2 className="font-serif text-[#6B1E2E] text-2xl md:text-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Saved Addresses
          </h2>
          <div className="w-10 h-px bg-[#C8A24A]/40 mt-3" />
        </div>
        {!showForm && (
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="self-end inline-flex items-center gap-2 px-6 py-3 border border-[#C8A24A]/50
                       text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-[0.2em]
                       hover:border-[#C8A24A] hover:bg-[#C8A24A]/8 transition-all duration-200"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add New Address
          </button>
        )}
      </div>

      {/* Inline form */}
      {showForm && (
        <AddressForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      {/* Address cards */}
      {loading ? (
        <div className="flex gap-5">
          <div className="h-40 w-full bg-[#C8A24A]/8 animate-pulse rounded-sm" />
          <div className="h-40 w-full bg-[#C8A24A]/8 animate-pulse rounded-sm" />
        </div>
      ) : addresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center text-center py-16 border border-[#C8A24A]/20 bg-white">
          <Sparkle size={28} className="mb-4 opacity-50" />
          <p className="font-serif italic text-[#6B1E2E]/70 text-lg mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            No saved addresses yet.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-7 py-3 bg-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] font-bold
                       uppercase tracking-[0.3em] hover:bg-[#E8C766] transition-colors"
            style={{ clipPath: CLIP }}
          >
            + Add First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {addresses.map(addr => (
            <div
              key={addr.id}
              className="relative border border-[#C8A24A]/20 bg-white p-5 hover:border-[#C8A24A]/50 transition-all duration-300"
              style={{ clipPath: CLIP }}
            >
              {/* Default badge */}
              {addr.is_default && (
                <span className="absolute top-3 right-4 font-sans text-[8px] font-bold uppercase tracking-[0.2em]
                                 px-2 py-0.5 bg-[#C8A24A] text-[#6B1E2E]">
                  Default
                </span>
              )}

              {/* Label */}
              <span className="block font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#C8A24A] mb-2">
                {addr.label}
              </span>

              {/* Details */}
              <p className="font-sans text-sm font-semibold text-[#6B1E2E] mb-1">{addr.name}</p>
              <p className="font-sans text-xs text-[#6B1E2E]/65 leading-relaxed mb-1">
                {addr.line1} {addr.line2 && <><br/>{addr.line2}</>}
              </p>
              <p className="font-sans text-xs text-[#6B1E2E]/65 mb-1">
                {addr.city}, {addr.state} — {addr.pincode}
              </p>
              <p className="font-sans text-xs text-[#6B1E2E]/50 mb-4">{addr.phone}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 border-t border-[#C8A24A]/15 pt-3">
                <button
                  onClick={() => handleEdit(addr)}
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]
                             text-[#C8A24A] hover:text-[#6B1E2E] transition-colors"
                >
                  Edit
                </button>
                <span className="text-[#C8A24A]/30 text-xs">|</span>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="font-sans text-[10px] text-[#6B1E2E]/40 hover:text-red-600
                             uppercase tracking-[0.2em] transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAB 4 — WISHLIST
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WishlistTab = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  return (
    <div>
      <div className="mb-8">
        <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#C8A24A] mb-1">
          ✦ Saved Pieces ✦
        </span>
        <h2 className="font-serif text-[#6B1E2E] text-2xl md:text-3xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          My Wishlist
        </h2>
        <div className="w-10 h-px bg-[#C8A24A]/40 mt-3" />
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center text-center py-16 border border-[#C8A24A]/20 bg-white">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C8A24A"
            strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p className="font-serif italic text-[#6B1E2E]/70 text-lg mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Your wishlist is empty.
          </p>
          <Link
            to="/collections"
            className="px-7 py-3 bg-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] font-bold
                       uppercase tracking-[0.3em] hover:bg-[#E8C766] transition-colors"
            style={{ clipPath: CLIP }}
          >
            Browse Collections →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((item) => {
            const p = item.product || item;
            const price = p.discount_price || p.price;
            return (
              <div key={item.id || p.id}
                className="border border-[#C8A24A]/20 bg-white overflow-hidden group
                           hover:border-[#C8A24A]/50 transition-all duration-300">
                {/* Image */}
                <div className="relative h-44 bg-white overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkle size={28} className="opacity-30" />
                    </div>
                  )}
                  {/* Remove */}
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center
                               text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="font-serif text-[#6B1E2E] text-base leading-snug mb-2 line-clamp-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {p.name}
                  </p>
                  <p className="font-sans text-sm font-bold text-[#C8A24A]">
                    ₹{Number(price).toLocaleString('en-IN')}
                  </p>
                  <Link
                    to={`/product/${p.slug || p.id}`}
                    className="mt-3 block text-center py-2 border border-[#C8A24A]/40 font-sans text-[9px]
                               uppercase tracking-[0.2em] text-[#6B1E2E] hover:border-[#C8A24A] hover:text-[#C8A24A]
                               transition-all duration-200"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIDEBAR ICONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const icons = {
  profile: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  orders: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/>
      <path d="M9 12h6M9 16h4"/>
    </svg>
  ),
  addresses: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  wishlist: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  signout: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROOT — AccountPage
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Account | Aishka';
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile',   label: 'Profile Info',     icon: icons.profile },
    { id: 'orders',    label: 'Order History',     icon: icons.orders },
    { id: 'addresses', label: 'Saved Addresses',   icon: icons.addresses },
    { id: 'wishlist',  label: 'Wishlist',           icon: icons.wishlist },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Sparkle size={28} className="animate-pulse" />
      </div>
    );
  }

  if (!user) return null;

  const initials = (user.name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Page title strip */}
      <div className="border-b border-[#C8A24A]/20 bg-white py-6 px-6 md:px-12 mb-10">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 font-sans text-[10px] text-[#6B1E2E]/50 uppercase tracking-[0.2em]">
          <Link to="/" className="hover:text-[#C8A24A] transition-colors">Home</Link>
          <span className="text-[#C8A24A]/40">›</span>
          <span className="text-[#6B1E2E]">My Account</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ━━━ SIDEBAR ━━━ */}
          <aside className="lg:w-[240px] shrink-0">

            {/* User card */}
            <div className="border border-[#C8A24A]/20 bg-white p-5 mb-4 flex items-center gap-4">
              <Avatar name={user.name || ''} size={52} />
              <div className="min-w-0">
                <p className="font-serif text-[#6B1E2E] text-base leading-tight truncate"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {user.name || 'Member'}
                </p>
                <p className="font-sans text-[10px] text-[#6B1E2E]/50 truncate mt-0.5">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Desktop sidebar nav */}
            <nav className="hidden lg:flex flex-col border border-[#C8A24A]/20 bg-white overflow-hidden divide-y divide-[#C8A24A]/10">
              {tabs.map(t => (
                <NavItem
                  key={t.id}
                  icon={t.icon}
                  label={t.label}
                  active={activeTab === t.id}
                  onClick={() => setActiveTab(t.id)}
                />
              ))}
              <NavItem
                icon={icons.signout}
                label="Sign Out"
                onClick={handleLogout}
                danger
              />
            </nav>

            {/* Mobile horizontal tab bar */}
            <div className="flex lg:hidden overflow-x-auto gap-1 pb-1 border-b border-[#C8A24A]/20">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 font-sans text-[9px]
                             uppercase tracking-[0.15em] font-bold transition-colors duration-200 border-b-2
                             ${activeTab === t.id
                               ? 'text-[#C8A24A] border-[#C8A24A]'
                               : 'text-[#6B1E2E]/50 border-transparent hover:text-[#6B1E2E]'}`}
                >
                  <span className={activeTab === t.id ? 'text-[#C8A24A]' : 'text-[#6B1E2E]/40'}>
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 font-sans text-[9px]
                           uppercase tracking-[0.15em] font-bold text-red-500/70 border-b-2 border-transparent
                           hover:text-red-600 transition-colors"
              >
                {icons.signout}
                Sign Out
              </button>
            </div>
          </aside>

          {/* ━━━ CONTENT AREA ━━━ */}
          <main className="flex-1 min-w-0">
            {activeTab === 'profile'   && <ProfileTab user={user} />}
            {activeTab === 'orders'    && <OrdersTab />}
            {activeTab === 'addresses' && <AddressesTab />}
            {activeTab === 'wishlist'  && <WishlistTab />}
          </main>

        </div>
      </div>
    </div>
  );
};

export default AccountPage;
