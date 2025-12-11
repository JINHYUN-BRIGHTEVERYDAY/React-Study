import { useState } from "react";
import { create } from "zustand";


// const useName = create();
export const useName = create((set) => ({
    name : "",
    // set을 통해서 호출하기
    // set 함수 안에 객체 넣어서 호출하기
    setName: (name) => set({"name" : name}),
}));


export const useUserInfo = create(set => ({
    userInfo: {
        username: "",
        email: "",
        phone: "",
    },

    setUserInfo: (user) => set({userInfo: user})
}))


// 수정하는 부분 -> 배열 만들기
export const useUserInfoList = create(set => ({
    userInfoList: [],
    setUserToList: (user) => set((state) => ({
        userInfoList: [...state.userInfoList, user]
    })) // 매개변수로 넘어온 객체를 어떻게 리스트에 추가할지?

}))


