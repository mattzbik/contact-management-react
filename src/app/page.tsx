'use client';
import { useContactContext } from '@/context/context';
import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { contacts, setContacts } = useContactContext();
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Main Page</Typography>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        {contacts.map((c) => (
          <Grid key={c.id} item xs={12} sm={6} md={4} lg={3}>
            <Card raised>
              <CardContent>
                <Typography>First Name: {c.firstName}</Typography>
                <Typography>
                  Last Name:{' '}
                  {c.lastName ?? ' This contact does not have a last name.'}
                </Typography>
                <Typography>Email: {c.email}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Edit />}
                  onClick={() => router.push(`/edit/contact/${c.id}`)}
                >
                  Edit Contact
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Delete />}
                  onClick={() =>
                    setContacts(contacts.filter((con) => c.id !== con.id))
                  }
                >
                  Remove Contact
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid item mt={4}>
        <Button
          variant="contained"
          sx={{ a: { textDecoration: 'none', color: 'inherit' } }}
          startIcon={<Edit />}
          onClick={() => router.push('/create/contact')}
        >
          <Link href="/create/contact">Create New Contact</Link>
        </Button>
      </Grid>
    </Grid>
  );
}
