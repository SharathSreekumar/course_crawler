var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var mongoose=require('mongoose');

var courseModel = require('../models/Course3');

mongoose.connect('mongodb://localhost:27017/course4');
mongoose.connection.on('error',function(){
    console.error('MongoDb is not connected. Check if Mongod is running.');
});

exports.createCourse = function(req,res){
    res.render('webtrial');
}

storeNewCourse = function(crc,lk,searc){    // this function is to store value using 'post' operation
    var courseH = new courseModel();
    courseH.course = crc;
    courseH.link = lk;
    courseH.courseSearcH = searc;
    courseH.save();
}

var urls = ['https://www.coursera.org','https://www.edx.org'];
var queries = ['/api/courses.v1?fields=certificates,instructorIds,partnerIds,photoUrl,specializations,startDate,v1Details,partners.v1(homeLink,logo,name),instructors.v1(firstName,lastName,middleName,prefixName,profileId,shortName,suffixName),specializations.v1(logo,partnerIds,shortName),v1Details.v1(upcomingSessionId),v1Sessions.v1(durationWeeks,hasSigTrack)&includes=instructorIds,partnerIds,specializations,v1Details,specializations.v1(partnerIds),v1Details.v1(upcomingSessionId)&extraIncludes=_facets&q=search&query=java&limit=20&courseType=v1.session,v2.ondemand','/search/api/all'];

var url1 = 'https://www.coursera.org/api/courses.v1?fields=certificates,instructorIds,partnerIds,photoUrl,specializations,startDate,v1Details,partners.v1(homeLink,logo,name),instructors.v1(firstName,lastName,middleName,prefixName,profileId,shortName,suffixName),specializations.v1(logo,partnerIds,shortName),v1Details.v1(upcomingSessionId),v1Sessions.v1(durationWeeks,hasSigTrack)&includes=instructorIds,partnerIds,specializations,v1Details,specializations.v1(partnerIds),v1Details.v1(upcomingSessionId)&extraIncludes=_facets&q=search&query=';
var url2 = 'https://www.edx.org/search/api/all';

var query = '&limit=20&courseType=v1.session,v2.ondemand';

exports.startNewCollection = function(req,res) {
    request.get(url1+req.body.search+query,function(err,resp, body) {
        console.log(req.body.search);
        if(err)
            return console.log(url1+req.body.search+query+' error!');            //exiting at error...
        $ = cheerio.load(body);
        var data = JSON.parse(body);
        console.log(req.body.search);
        console.log("Entering the loop.....");
        for(var d in data.elements)
        {
            //console.log(data[d].l);
            //console.log(data[d].url);
            //createCourse;
            storeNewCourse(data.elements[d].name,data.elements[d].photoUrl,req.body.search);
        }
        
        console.log("Success!!");
    });
}


exports.displayAllCourse = function(req,res){
    courseModel.find(req.params.course,function(err,courses){
        if(err)
            res.send(err);
        //res.json(courses);
        res.render('index',{
            courses : courses
        });
    });
    
}