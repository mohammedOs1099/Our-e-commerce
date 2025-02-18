import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import catProducts from "./products/productsSlice";
import cart from "./cart/cartSlice";
import storage from "redux-persist/lib/storage";
import wishList from "./wishList/wishListSlice";
import auth from "./auth/authSlice.ts";
import orders from "./Orders/ordersSlice.ts";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
const rootPresistconfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"]
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"]
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"]
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  catProducts,
  orders,
  cart: persistReducer(cartPersistConfig, cart),
  wishList: wishList
});
const persistedReducer = persistReducer(rootPresistconfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
const persistor = persistStore(store);
export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
