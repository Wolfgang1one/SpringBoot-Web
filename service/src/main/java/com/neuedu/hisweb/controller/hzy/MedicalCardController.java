package com.neuedu.hisweb.controller.hzy;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neuedu.hisweb.entity.JsonResult;
import com.neuedu.hisweb.entity.MedicalCard;
import com.neuedu.hisweb.entity.vo.MedicalCardVo;
import com.neuedu.hisweb.service.IMedicalCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/medicalCard")
public class MedicalCardController {
    @Autowired
    IMedicalCardService iMedicalCardService;

    // 获取就诊卡信息列表
    @GetMapping("/page")
    public JsonResult<Page<MedicalCardVo>> getMedicalCardPage(@RequestParam(value = "pn", defaultValue = "1") Integer pn,
                                                              @RequestParam(value = "count", defaultValue = "5") Integer count,
                                                              @RequestParam(value = "keyword",required = false)String keyword,
                                                              @RequestParam(value = "gender",required = false)Integer gender,
                                                              @RequestParam(value = "cardType",required = false)Integer type){
        Page<MedicalCardVo> page=Page.of(pn,count);
        iMedicalCardService.selectPage(page,keyword,gender,type);
        return new JsonResult<>(page);
    }

    //根据就诊人id获取其对应的就诊卡列表
    @GetMapping("/list/{id}")
    public JsonResult getList(@PathVariable("id")Integer id){
        LambdaQueryWrapper<MedicalCard> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MedicalCard::getCustomerId,id);
        List<MedicalCard> res = iMedicalCardService.list(wrapper);
        return new JsonResult(res);
    }


    //根据就诊人id获取其对应的就诊卡列表
    @GetMapping("/info/{id}")
    public JsonResult getInfoByID(@PathVariable("id")Integer id){
        MedicalCard res = iMedicalCardService.getById(id);
        return new JsonResult(res);
    }

    // 根据id删除就诊人信息
    @PostMapping("/del")
    public JsonResult deleteCustomer(@RequestParam("id")Integer id){
        boolean res = iMedicalCardService.removeById(id);
        return new JsonResult(res);
    }

    @PostMapping("/add")
    public JsonResult<MedicalCard> addMedicalCard(@RequestBody MedicalCard medicalCard){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        medicalCard.setCreatedate(simpleDateFormat.format(new Date()));
        int newCardNo = iMedicalCardService.getMaxCardNo()+1;
        medicalCard.setCardNo(Integer.toString(newCardNo));
        boolean res= iMedicalCardService.save(medicalCard);
        if(res)return new JsonResult<MedicalCard>(medicalCard);
        else return new JsonResult<>("添加失败");
    }

    @PostMapping("/update")
    public JsonResult<MedicalCard> updateUser(@RequestBody MedicalCard medicalCard){
        boolean rs= iMedicalCardService.updateById(medicalCard);
        if(rs)return new JsonResult<MedicalCard>(medicalCard);
        else return new JsonResult<>("修改失败");
    }
}
