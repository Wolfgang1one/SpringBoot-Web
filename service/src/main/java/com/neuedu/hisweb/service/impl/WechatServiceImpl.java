package com.neuedu.hisweb.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.neuedu.hisweb.entity.Customer;
import com.neuedu.hisweb.entity.CustomerBind;
import com.neuedu.hisweb.entity.JsonResult;
import com.neuedu.hisweb.mapper.CustomerBindMapper;
import com.neuedu.hisweb.mapper.CustomerMapper;
import com.neuedu.hisweb.service.IWechatService;
import com.neuedu.hisweb.utils.JwtUtils;
import com.neuedu.hisweb.utils.WechatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.*;

@Service
public class WechatServiceImpl implements IWechatService {

    @Autowired
    WechatUtils wechatUtils;
    @Autowired
    CustomerBindMapper customerBindMapper;
    @Autowired
    CustomerMapper customerMapper;

    @Override
    public JsonResult<Object> wechatLogin(String code) {
        Map<String, Object> resMap = new HashMap<String, Object>();
        String openId = wechatUtils.requestWxLogin(code);
        Customer customer = null;
        List<CustomerBind> dataList =  customerBindMapper.selectList(new LambdaQueryWrapper<CustomerBind>().eq(CustomerBind::getOpenId, openId));
        if (dataList.size() == 0) {
            // 返回openId，前端调用注册接口
            resMap.put("openId", openId);
            return new JsonResult<>(resMap);
        }
        else{
            customer = customerMapper.selectById(dataList.get(0).getCustomerId());
        }
        resMap.put("userInfo", customer);
        resMap.put("token", JwtUtils.sign(customer));
        return new JsonResult<>(resMap);
    }

    @Override
    public JsonResult<Object> wechatReg(Customer customer, String openId) {
        customer.setChannel(182);
        customer.setDelMark(1);
        customer.setCreatedate(new Date());
        customerMapper.insert(customer);
        CustomerBind customerBind = new CustomerBind();
        customerBind.setCustomerId(customer.getId());
        customerBind.setCreateDate(new Date());
        customerBind.setOpenId(openId);
        customerBindMapper.insert(customerBind);
        return new JsonResult<>(true);
    }
}
