package com.neuedu.hisweb.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.neuedu.hisweb.entity.vo.RegisterVo;
import org.springframework.transaction.annotation.Transactional;

/**
 * create by simon at 2024-01-23
 *
 * @Description:文件描述：
 */
@Transactional
public interface IRegisterVoService extends IService<RegisterVo> {
}
