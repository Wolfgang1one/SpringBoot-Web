package com.neuedu.hisweb.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neuedu.hisweb.entity.MedicalCard;
import com.neuedu.hisweb.entity.vo.MedicalCardVo;
import com.neuedu.hisweb.mapper.MedicalCardMapper;
import com.neuedu.hisweb.service.IMedicalCardService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author lynn
 * @since 2023-08-09
 */
@Service
public class MedicalCardServiceImpl extends ServiceImpl<MedicalCardMapper, MedicalCard> implements IMedicalCardService {

    /**
     * 改成能够增加性别或者是卡类型来做筛选
     * */
    @Override
    public Page<MedicalCardVo> selectPage(Page<MedicalCardVo> page, String keyword,Integer gender,Integer cardType) {
        return  getBaseMapper().selectPage(page,keyword,gender,cardType);
    }

    @Override
    public Integer getMaxCardNo() {
        return getBaseMapper().getMaxCardNo();
    }


}
