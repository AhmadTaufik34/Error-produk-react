import React, { useEffect, useState } from 'react';

//material-ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useFirebase } from '../../../components/FirebaseProvider';
import { useDocument } from 'react-firebase-hooks/firestore';

import AppPageLoading from '../../../components/AppPageLoading'

function EditProduk({ match }) {

    const {firestore, user} = useFirebase();

    const produkDoc = firestore.doc(`toko/${user.uid}/produk/${match.params.produkId}`);

    const [snapshot, loading] = useDocument(produkDoc);

    const [form, setForm] = useState({
        nama: '',
        sku: '',
        harga: 0,
        stok: 0,
        deskripsi: ''
    });

    const [error, setError] = useState({
        nama:'',
        sku:'',
        harga:'',
        stok:'',
        deskripsi:''
    })

    useEffect(() => {
        if(snapshot){
            setForm(snapshot.data());
        }
    },[snapshot]);

    // useEffect(()=>{
    //     if(snapshot){
    //         setForm(snapshot.data());
    //     }
    // },[snapshot]);

    const handleChange = e =>{

        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    
    
    if(loading){
        return <AppPageLoading />
    }
    return <div>
        <Typography variant="h5" component="h1">Edit Produk: {form.nama}</Typography>
        <Grid container alignItems="center" justify="center">
            <Grid item xs={12} sm={6}>
                <TextField 
                    id="nama"
                    name="nama"
                    label="Nama Produk"
                    margin="normal"
                    fullWidth
                    value={form.nama}
                    onChange={handleChange}
                    helperText={error.nama}
                    error={error.nama?true:false}
                />
                <TextField 
                    id="sku"
                    name="sku"
                    label="SKU Produk"
                    margin="normal"
                    fullWidth
                    value={form.sku}
                    onChange={handleChange}
                    helperText={error.sku}
                    error={error.sku?true:false}
                />
                <TextField 
                    id="harga"
                    type="number"
                    name="harga"
                    label="Harga Produk"
                    margin="normal"
                    fullWidth
                    value={form.harga}
                    onChange={handleChange}
                    helperText={error.harga}
                    error={error.harga?true:false}
                />
                <TextField 
                    id="stok"
                    type="number"
                    name="stok"
                    label="Stok Produk"
                    margin="normal"
                    fullWidth
                    value={form.stok}
                    onChange={handleChange}
                    helperText={error.stok}
                    error={error.stok?true:false}
                />
                <TextField 
                    id="deskripsi"
                    name="deskripsi"
                    label="Deskripsi Produk"
                    margin="normal"
                    multiline
                    rowsMax={3}
                    fullWidth
                    value={form.deskripsi}
                    onChange={handleChange}
                    helperText={error.deskripsi}
                    error={error.deskripsi?true:false}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography>Upload Gambar</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" variant="contained">
                    Simpan
                </Button>
            </Grid>
        </Grid>
    </div>
}

export default EditProduk;