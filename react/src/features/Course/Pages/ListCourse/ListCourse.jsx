import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { parse, stringify } from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import courseApi from '../../../../api/courseApi';
import courseApiFake from '../../../../api/courseApiFake';
import {
  colorBlack1,
  colorOrange2,
  colorWhite1,
} from '../../../../components/color/color';
import Header from '../../../../components/header/index';
import LeftCourse from './components/LeftCourse';
import RightCoures from './components/RightCoures';
import SkeletonCourse from './components/SkeletonCourse';
import TabPrice from './components/TabPrice';

ListCourse.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    background: colorWhite1,
    padding: '50px 0px 20px 0px',
  },
  left: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  right: {},
  backgroundHeader: {
    height: '64px',
    background: colorBlack1,
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    flex: '1 1 auto',
    justifyContent: 'center',
    padding: '20px 0px 50px 0px',
    '&> nav > ul> li> .MuiPaginationItem-textPrimary.Mui-selected': {
      color: '#fff',
      backgroundColor: colorOrange2,
    },
  },
}));
function ListCourse(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [dataCourse, setDataCourse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRows: 10,
  });
  const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 9,
  // });

  const queryParams = useMemo(() => {
    const params = parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      // _sort: params._sort || "updateAt",
      // _order: params._order || "desc",
      _sort: params._sort || 'updateAt:desc',
      _category: params._category || '-1',
    };
  }, [location.search]);
  useEffect(() => {
    (async () => {
      try {
        const rp = await courseApi.categories({});
        // console.log("fetch categories", rp);
        setCategories(rp);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      console.log('return fetch categories');
    };
  }, []);
  useEffect(() => {
    (async () => {
      try {
        // console.log(queryParams);
        const { data, pagination } = await courseApi.getAll(queryParams);
        console.log(data);
        console.log(pagination);
        setDataCourse(data);
        setPagination(pagination);
        // console.log("fetch page courses");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
    return () => {
      // console.log("return fetch page courses");
      setDataCourse([]);
      setPagination({});
    };
  }, [queryParams]);

  function handlePageChange(e, page) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: stringify(filters),
    });
  }
  function handleSortChange(values) {
    const sort = values;

    const filters = {
      ...queryParams,
      _sort: sort,
      _page: 1,
    };

    history.push({
      pathname: history.location.pathname,
      search: stringify(filters, null, null, escape()),
    });
  }
  const handleCategorieChange = (values) => {
    console.log(values);
    const category = values.id;

    const filters = {
      ...queryParams,
      _category: category,
      _page: 1,
    };

    history.push({
      pathname: history.location.pathname,
      search: stringify(filters, null, null, escape()),
    });
  };
  return (
    <>
      <Header />
      <Box className={classes.backgroundHeader} />
      <Box className={classes.root}>
        <Container>
          <Grid container spacing={2}>
            <Grid item className={classes.left} xl={3} lg={3} md={3}>
              <Paper elevation={0}>
                <LeftCourse
                  categories={categories}
                  onChange={handleCategorieChange}
                  categorie={queryParams._category}
                />
              </Paper>
            </Grid>
            <Grid
              item
              className={classes.right}
              xl={9}
              lg={9}
              md={9}
              sm={12}
              xs={12}
            >
              <Paper elevation={0}>
                <TabPrice onChange={handleSortChange} value={location.search} />
                {loading ? (
                  <SkeletonCourse />
                ) : (
                  <RightCoures dataCourse={dataCourse} />
                )}
                <Box className={classes.pagination}>
                  <Pagination
                    color="primary"
                    count={Math.ceil(pagination._totalRows / pagination._limit)}
                    page={pagination._page || 1}
                    onChange={handlePageChange}
                  ></Pagination>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ListCourse;
