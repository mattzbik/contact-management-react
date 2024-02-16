'use client';
import { AppBar, MenuItem, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuItem onClick={() => router.push('/')}>Home</MenuItem>
        <MenuItem onClick={() => router.push('/create/contact')}>
          Create
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}
