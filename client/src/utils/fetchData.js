import React, {useEffect, useState} from "react";
import {Box, Button, Stack, TextField, Typography} from '@mui/material';


const options = {
    method: 'GET',
    
    params: {limit: '10'},
    headers: {
      'X-RapidAPI-Key': '68b2644d45msh18182d89d8cec6ap1c9d36jsnafec28820f7d',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  
  const options = {
    method: 'GET',
    params: {
      id: 'UCE_M8A5yxnLfW0KghEeajjw'
    },
    headers: {
      'X-RapidAPI-Key': '454295ab49msh46efa64e76aeac4p1d1740jsn368ac28ecffc',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };
  
  export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await res.json();
  
    return data;
  };